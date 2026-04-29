export default function cssjsPlugin() {
  return {
    name: 'vite:cssjs',
    generateBundle(_outputOptions, bundle) {
      for (const filename of Object.keys(bundle)) {
        const chunk = bundle[filename];

        this.emitFile({
          type: 'asset',
          fileName: filename.replace('index.js', 'css.js'),
          source: chunk.code.replace(/\.scss/g, '.css'),
        });
      }
    },
  };
}
