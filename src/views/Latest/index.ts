// Wraps the route container and other dependencies with webpack's
// require.ensure for code splitting.

export default (resolve: any) => {
  require.ensure([], (require) => {
    resolve(require('./Latest.vue'));
  });
};
