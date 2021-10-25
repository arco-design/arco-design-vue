// eslint-disable-next-line
const marked = require('marked');
// eslint-disable-next-line
const vueTransformer = require('vue-jest');

const getVueCode = (content) => {
  const tokens = marked.lexer(content);
  for (const token of tokens) {
    if (token.type === 'code' && token.lang === 'vue') {
      return token.text;
    }
  }
  return undefined;
};

module.exports = {
  process(source, sourcePath, config) {
    const code = getVueCode(source);
    return vueTransformer.process(code, sourcePath, config);
  },
  getCacheKey: vueTransformer.getCacheKey,
};
