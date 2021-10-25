// Used to manually run unit tests within the project
module.exports = {
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest',
  },
};
