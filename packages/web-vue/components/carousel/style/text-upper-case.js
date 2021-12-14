module.exports = {
  install(_, __, functions) {
    functions.add('text-upper-case', (text) => {
      return text.value.toUpperCase();
    });
  },
};
