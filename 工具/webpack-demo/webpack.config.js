const path = require('path');
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require('webpack')
function resolve(pathName) {
  return path.resolve(__dirname,pathName)
}
module.exports = {
  mode: 'development',
  entry: {
    index: resolve('./src/index.js'),
    demo: resolve('./src/demo.js'),
  },
  output: {
    path: resolve('dist'),
    filename: '[name].[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js?/,
        include: [
          resolve('src')
        ],
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        include: [
          resolve('src')
        ],
        use: [
          'style-loader',
          'css-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: resolve('dist')
            }
          },
          /**
            css-loader 负责解析 CSS 代码，主要是为了处理 CSS 中的依赖，例如 @import 和 url() 等引用外部文件的声明；
            style-loader 会将 css-loader 解析的结果转变成 JS 代码，运行时动态插入 style 标签来让 CSS 代码生效。
           */
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: resolve('dist')
            },
            
          },
          'css-loader', 
          'less-loader',
        ],
        // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ]
  },
  resolve: {
    alias: {
      '@': resolve('src'),
      utils: resolve('src/utils'),
    },
    extensions: ['.less','.css','.js','.vue']
  },
  plugins: [
    new UglifyPlugin(),
    // new ExtractTextPlugin('[name].[hash:8].css'),
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: 'template.html', // 配置文件模板
      inject: true, // 将 js 文件放在哪个位置: (true || 'body')放在body 底部 ，'head'放在头部 
    }), // 更多配置参考 https://github.com/jantimon/html-webpack-plugin
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new CopyWebpackPlugin([
      { from: 'src/copy/1.txt', to: 'build/1.txt', },
    ]),
    new webpack.ProvidePlugin({
      lodash: ['lodash']
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
}