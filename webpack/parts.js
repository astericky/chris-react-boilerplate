const webpack = require('webpack')

export default const devServer = (options) => ({
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: 'errors-only',
      host: options.host,
      port: options.port,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({
        multistep: true,
      })
    ],
})

export const setupCSS = (paths) => ({
  module: {
    loaders: [
      test: /\.css$/,
      loaders: ['style', 'css'],
      include: paths
    ]
  }
})
