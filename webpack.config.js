var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  CopyPlugin = require('copy-webpack-plugin');



module.exports = (env, argv) => ({
  devtool: false,
  cache: false,
  target: 'web',
  entry: './src/index',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    pathinfo: true,
    path: path.join(__dirname, './build')
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
    // new CopyPlugin([
    //   {
    //     from: "./src/**/*",
    //     to: "./build",
    //     test: /\.(svg|txt|woff|woff2|jpg)$/
    //   }
    // ]),
  ],
  module: {
    rules: [
      (argv.mode === 'production' ? {
        test: /\.(js|tsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          quiet: true
        }
      } : {}),
      {
        test: /\.(tsx?|js)$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      // {
      //   test: /\.svg$/,
      //   loader: 'svg-inline-loader'
      // },
      {
        test: /\.(woff|woff2|svg|png|mp4|jpg)$/,
        loader: 'file-loader',
        options: {
          esModule: false
        }
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
});
