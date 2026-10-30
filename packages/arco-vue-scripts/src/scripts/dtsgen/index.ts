import path from 'path';
import fs from 'fs-extra';
import {
  Diagnostic,
  ModuleResolutionKind,
  Project,
  ScriptTarget,
  SourceFile,
  ts,
} from 'ts-morph';
import glob from 'glob';
import { parse } from '@vue/compiler-sfc';

/**
 * 生成声明时会忽略的诊断码。
 * 5055：上次构建残留在 outDir（es/）里的产物会被当成输入文件，
 *      与源码无关（清空 outDir 后即消失），不应让构建失败。
 */
const IGNORED_DIAGNOSTIC_CODES = new Set([5055]);

export async function build(input: string, options?: { outDir?: string }) {
  const root = process.cwd();
  const tsConfigFilePath = fs.existsSync('tsconfig.json')
    ? 'tsconfig.json'
    : undefined;
  const project = new Project({
    // 只覆盖声明生成必需的三项，其余（target / lib / types / strict / jsx …）
    // 全部沿用 tsconfig.json，保证与 vue-tsc、IDE 用的是同一套类型环境
    compilerOptions: {
      declaration: true,
      emitDeclarationOnly: true,
      skipLibCheck: true,
    },
    tsConfigFilePath,
    skipAddingFilesFromTsConfig: true,
  });
  const isComponents = /^components/.test(input);
  if (isComponents) {
    project.compilerOptions.set({
      rootDir: path.resolve(root, 'components'),
    });
  }
  if (options?.outDir) {
    project.compilerOptions.set({
      outDir: path.resolve(root, options.outDir),
    });
  }

  // 包根目录的 ambient 声明（global.d.ts、b-tween.d.ts 等）也要加入项目，
  // 否则 JSX 命名空间、缺少类型声明的第三方模块都会被误报。
  glob
    .sync('*.d.ts', { cwd: root })
    .forEach((file) => project.addSourceFileAtPath(path.resolve(root, file)));

  // ts-morph 默认用的是 @ts-morph/common 里自带的一份旧 lib（lib.es6.d.ts），
  // DOM 等全局类型会比仓库的 TypeScript 落后（例如缺 FileSystemEntry）。
  // 这里把项目依赖的 TypeScript 自带 lib 显式补进来，保证和 vue-tsc/IDE 一致。
  const tsLibDir = path.dirname(require.resolve('typescript'));
  (project.getCompilerOptions().lib ?? []).forEach((lib) => {
    const libFile = path.join(tsLibDir, lib);
    if (fs.existsSync(libFile)) {
      project.addSourceFileAtPath(libFile);
    }
  });

  const files = glob.sync(input, {
    ignore: /components\/icon/.test(input)
      ? ['**/__test__/*', '**/__demo__/*']
      : ['**/__test__/*', '**/__demo__/*', 'components/icon/**/*'],
  });
  const sourceFiles: SourceFile[] = [];

  await Promise.all(
    files.map(async (file) => {
      const content = await fs.promises.readFile(
        path.resolve(root, file),
        'utf8'
      );
      if (file.endsWith('.vue')) {
        const sfc = parse(content);
        const { script, scriptSetup } = sfc.descriptor;
        if (script || scriptSetup) {
          let scriptContent = '';
          let isTSX = false;
          if (script && script.content) {
            scriptContent += script.content;
            if (script.lang === 'tsx') isTSX = true;
          }
          const sourceFile = project.createSourceFile(
            path.relative(root, file).replace('.vue', isTSX ? '.tsx' : '.ts'),
            scriptContent
          );
          if (sourceFile) {
            removeVueSpecifier(sourceFile);
            sourceFiles.push(sourceFile);
          }
        }
      } else {
        const sourceFile = project.createSourceFile(
          path.relative(root, file),
          content,
          {
            overwrite: true,
          }
        );
        if (sourceFile) {
          removeVueSpecifier(sourceFile);
          sourceFiles.push(sourceFile);
        }
      }
    })
  );

  // 收集类型错误：声明生成不应在存在类型错误的情况下"静默成功"，
  // 否则会产出一份带 .d.ts 的坏包。
  const errors: Diagnostic[] = [];
  const reported = new Set<string>();

  await Promise.all(
    sourceFiles.map(async (sourceFile) => {
      // eslint-disable-next-line no-console
      console.log(`Transform start: ${sourceFile.getFilePath()}`);
      const diagnostics = sourceFile
        .getPreEmitDiagnostics()
        .filter(
          (diagnostic) =>
            !IGNORED_DIAGNOSTIC_CODES.has(diagnostic.getCode()) &&
            diagnostic.getCategory() === ts.DiagnosticCategory.Error
        );
      if (diagnostics.length > 0) {
        // eslint-disable-next-line no-console
        console.log(project.formatDiagnosticsWithColorAndContext(diagnostics));
        diagnostics.forEach((diagnostic) => {
          const key = `${diagnostic.getCode()}|${diagnostic
            .getSourceFile()
            ?.getFilePath()}|${diagnostic.getStart()}|${diagnostic.getMessageText()}`;
          if (!reported.has(key)) {
            reported.add(key);
            errors.push(diagnostic);
          }
        });
      }
      const emitOutput = sourceFile.getEmitOutput();
      const outputFiles = emitOutput.getOutputFiles();
      await Promise.all(
        outputFiles.map(async (outputFile) => {
          const filepath = outputFile.getFilePath();
          await fs.ensureDir(path.dirname(filepath));
          await fs.writeFile(filepath, outputFile.getText(), 'utf8');
          // eslint-disable-next-line no-console
          console.log(`Emitted ${filepath}`);
        })
      );
    })
  );

  if (errors.length > 0) {
    // eslint-disable-next-line no-console
    console.error(
      `\n[dtsgen] 声明生成失败：共 ${errors.length} 个类型错误，请修复后重试。`
    );
    process.exit(1);
  }
}

const removeVueSpecifier = (sourceFile: SourceFile) => {
  const imports = sourceFile.getImportDeclarations();
  imports.forEach((item) => {
    const specifier = item.getModuleSpecifierValue();
    const ext = path.extname(specifier);
    if (ext === '.vue') {
      item.setModuleSpecifier(specifier.replace('.vue', ''));
    }
  });
};

export default build;
