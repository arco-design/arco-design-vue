// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getRgbStr } = require('@arco-design/color');

module.exports = {
  install(_, __, functions) {
    functions.add('get-rgb-str', (color) => {
      return getRgbStr(color.value);
    });

    functions.add('get-var-str', (color) => {
      if (color.value.indexOf('rgb') === 0) {
        return color.value.replace(/rgb\((.*)\)/, '$1');
      }
      return getRgbStr(color.value);
    });
  },
};
