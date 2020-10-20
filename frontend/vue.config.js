module.exports = {
  lintOnSave: 'error',
  devServer: {
    proxy: {
      '/': {
        target: 'http://0.0.0.0',
        changeOrigin: true,
        ws: true
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/style.scss";
        `
      }
    }
  }
}
