const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');
module.exports = defineConfig({
  publicPath: process.env.VUE_APP_BASE_URL || '/',
  transpileDependencies: true,
  configureWebpack: {
    watchOptions: {
      poll: true,
    },
    plugins: [
      new webpack.DefinePlugin({
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(false),
      })
    ]
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
