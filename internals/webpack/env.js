const PREFIX = /^NUSWHISPERS_/i;

// Adapted from create-react-app.
module.exports = function createClientEnvironment(env) {
  const processEnv = Object
    .keys(env)
    .filter(key => PREFIX.test(key))
    .reduce((e, key) => {
      e[key] = env[key]; // eslint-disable-line no-param-reassign
      return e;
    }, {
      NODE_ENV: env.NODE_ENV || 'development',
      VUE_ENV: env.VUE_ENV || 'client',
    });

  return {
    'process.env': Object
      .keys(processEnv)
      .reduce((e, key) => {
        e[key] = JSON.stringify(processEnv[key]); // eslint-disable-line no-param-reassign
        return e;
      }, {}),
  };
};
