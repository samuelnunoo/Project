const nodeExternals = require('webpack-node-externals')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'development',
  externals: [nodeExternals()],
  devtool: 'inline-cheap-module-source-map',
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] },
    {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]?[hash]'
      }
    }
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
