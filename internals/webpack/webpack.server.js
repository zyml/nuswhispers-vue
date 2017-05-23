require('dotenv').config();

const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

const rootPath = path.join(__dirname, '../../');

const baseConfig = require('./webpack.base');
const createClientEnvironment = require('./env');

module.exports = (env = process.env) => merge(baseConfig(), {
  entry: './src/entry-server.ts',

  // This allows webpack to handle dynamic imports in a Node-appropriate
  // fashion, and also tells `vue-loader` to emit server-oriented code when
  // compiling Vue components.
  target: 'node',

  // For bundle renderer source map support
  devtool: 'source-map',

  // This tells the server bundle to use Node-style exports
  output: {
    path: path.join(rootPath, 'dist/'),
    libraryTarget: 'commonjs2',
  },

  // https://webpack.js.org/configuration/externals/#function
  // https://github.com/liady/webpack-node-externals
  // Externalize app dependencies. This makes the server build much faster
  // and generates a smaller bundle file.
  externals: nodeExternals({
    whitelist: /\.css$/,
  }),

  // This is the plugin that turns the entire output of the server build
  // into a single JSON file. The default file name will be
  // `vue-ssr-server-bundle.json`
  plugins: [
    new webpack.DefinePlugin(createClientEnvironment(Object.assign(env, {
      VUE_ENV: 'server',
    }))),
    new VueSSRServerPlugin(),
  ],
});
