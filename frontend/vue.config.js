const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.VUE_APP_BASE_URL || '/',
  transpileDependencies: true,
  configureWebpack: {
    watchOptions: {
      poll: true,
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: `${process.env.VUE_APP_BASE_URL}`,
        changeOrigin: true
      }
    }
  }
})
