module.exports = {
  devServer: {
    proxy: {
      '/': {
        target: 'http://0.0.0.0',
        changeOrigin: true,
        ws: false
      }
    }
  }
}
