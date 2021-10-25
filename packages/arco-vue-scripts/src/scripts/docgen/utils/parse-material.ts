import fs from 'fs-extra';
import { parse } from 'comment-parser';
import { parse as babelParse } from '@babel/parser';
import path from 'path';

function getMaterialData(content: string) {
  const blocks = parse(content);
  const baseNode = babelParse(content, {
    sourceType: 'module',
  });

  const materialData = [];

  for (const block of blocks) {
    const data: Record<string, any> = {
      kind: 'member',
    };
    for (const tag of block.tags) {
      if (tag.tag === 'file') {
        data.kind = 'file';
      } else {
        data[tag.tag] = tag.name;
      }
    }
    materialData.push(data);
  }

  const imports: string[] = [];
  for (const node of baseNode.program.body) {
    if (node.type === 'ImportDeclaration' && node.source?.value) {
      imports.push(node.source.value);
    }
  }

  return { materialData, imports };
}

const getMaterialMdContent = (materialData: Record<string, any>) => {
  return `\`\`\`json type=description\n${JSON.stringify(
    materialData,
    null,
    2
  )}\n\`\`\`\n`;
};

async function getDemoMdContent(filename: string) {
  const code = await fs.readFile(filename, 'utf8');
  return `\`\`\`vue\n${code}\n\`\`\`\n`;
}

export default async function parseMaterial(
  content: string,
  { matcher, dirname }: { matcher: RegExp; dirname: string }
) {
  const match = content.match(matcher);
  if (match && match[1]) {
    const filename = path.resolve(dirname, match[1]);
    const demoDirname = path.dirname(filename);
    const indexContent = await fs.readFile(filename, 'utf8');
    const { materialData, imports } = getMaterialData(indexContent);
    let result = `${getMaterialMdContent(materialData)}\n`;

    for (const item of imports) {
      const filename = path.resolve(demoDirname, item);
      result += `${await getDemoMdContent(filename)}\n`;
    }

    return content.replace(match[0], result);
  }
  return content;
}
