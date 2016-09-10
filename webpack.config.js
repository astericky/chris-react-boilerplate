const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const validate = require('webpack-validator')

const parts = require('./webpack/parts.js')

let config;
const nodeEnv = process.env.NODE_ENV || 'production'
const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, '_build'),
}

const common = {
  devtool: 'source-map',
  entry: {
    filename: path.resovle(PATHS.app, './js/index.jsx'),
  },
  output: {
    filename: path.resovle(PATHS.build, './js/bundle.js'),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        query: {
          presets: ['latest', 'stage-2', 'react'],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'The Gayngle',
      template: 'src/index.html',
    }),
    // uglify js
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
      sourcemap: true,
    }),
    // env plugin
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
    }),
  ],
}

switch (process.env.npm_lifecycle_event) {
  case 'build':
    config = Object.assign(
      {},
      common,
      parts.setupCSS(PATHS.app)
    )
    break
  default:
    config = Object.assign(
      {},
      common,
      parts.setupCSS(PATHS.app),
      parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT,
      })
    )
}

module.exports = validate(config)
