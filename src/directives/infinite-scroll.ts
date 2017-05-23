export default process.env.VUE_ENV === 'server' ?
  () => {} : // tslint:disable-line
  require('vue-infinite-scroll'); // tslint:disable-line
