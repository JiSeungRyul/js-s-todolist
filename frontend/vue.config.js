const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');
const path = require('path');

module.exports = defineConfig({
  publicPath: process.env.VUE_APP_BASE_URL || '/',
  transpileDependencies: true,
  configureWebpack: {
    watchOptions: {
      poll: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(false),
      })
    ],

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
