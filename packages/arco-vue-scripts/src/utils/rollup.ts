import { OutputOptions, RollupBuild, RollupOutput } from 'rollup';

/**
 * 根据output类型输出打包文件
 * @param output
 * @param bundle
 */
export const outputBundle = async (
  output?: OutputOptions | OutputOptions[],
  bundle?: RollupBuild
) => {
  if (!output || !bundle) {
    return false;
  }

  if (Array.isArray(output)) {
    const list: Promise<RollupOutput>[] = [];

    for (const item of output) {
      list.push(bundle.write(item));
    }

    return Promise.all(list);
  }

  return bundle.write(output);
};
