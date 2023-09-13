var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => ({
  devtool: false,
  cache: false,
  target: 'web',
  entry: './src/index',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    pathinfo: true,
    path: path.join(__dirname, './dist')
  },
  devServer: {
    port: 8090,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.ejs",
      inject: true,
      meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'swc-loader',
        options: {
          module: {
            "type": "es6",

            // These are defaults.
            "strict": true,
            "strictMode": true,
            "lazy": false,
            "noInterop": false
          },
          jsc: {
            target: 'es2019',
            externalHelpers: true,
            parser: {
              syntax: 'typescript',
              dynamicImport: true,
            }
          }
        }
      },
      {
        test: /\.(woff|woff2|svg|png|mp4|jpg)$/,
        loader: 'file-loader',
        options: {
          esModule: false,
          emitFile: true,
        }
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
});
