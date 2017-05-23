// Adapted from https://hackernoon.com/jest-for-all-episode-1-vue-js-d616bccbe186.

const beautify = require('js-beautify').html;

module.exports = {
  test(obj) {
    return typeof obj === 'string' && obj[0] === '<';
  },
  print(val) {
    return beautify(val, {});
  },
};
