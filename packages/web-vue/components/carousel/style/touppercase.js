module.exports = {
  install(_, __, functions) {
    functions.add('text-uppercase', (text) => {
      return text.value.toUpperCase();
    });
  },
};
