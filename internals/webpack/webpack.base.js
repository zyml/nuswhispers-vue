const path = require('path');
const autoprefixer = require('autoprefixer');

const rootPath = path.join(__dirname, '../../');
const srcPath = path.join(rootPath, 'src');

const isProduction = env => env.NODE_ENV === 'production';

module.exports = (env = process.env) => ({
  entry: {
    app: [
      './src/entry-client.ts',
    ],
  },
  output: {
    path: path.join(rootPath, 'dist/public'),
    publicPath: '/',
    filename: isProduction(env) ? 'client.[chunkhash].js' : 'client.[hash].js',
  },
  resolve: {
    extensions: ['.vue', '.ts', '.js', '.json'],
    alias: {
      vue: 'vue/dist/vue.common.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        include: srcPath,
        exclude: /node_modules/,
      },
      {
        test: /\.(js|ts)$/,
        loader: 'awesome-typescript-loader',
        include: srcPath,
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: srcPath,
        exclude: /node_modules/,
        options: {
          loaders: {
            ts: 'awesome-typescript-loader',
          },
          postcss: [
            autoprefixer({ browsers: ['last 2 versions'] }),
          ],
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'assets/img/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'assets/fonts/[name].[hash:7].[ext]',
        },
      },
    ],
  },
});
