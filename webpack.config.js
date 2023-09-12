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
        test: /\.(tsx?|js)$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.(woff|woff2|svg|png|mp4)$/,
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
