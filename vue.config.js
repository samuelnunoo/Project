module.exports = {
  pages: {
    index: {
      entry: "dist/vue/main.js",
      template: "template/index.html",
      filename: "index.html",
      title: "Type.io"
    }
  },
  runtimeCompiler: true,
  configureWebpack: {
    devtool: 'source-map'
  }
};
