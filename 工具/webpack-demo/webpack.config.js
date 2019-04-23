const path = require('path');
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');
const Mock = require('./src/mock/index');
const FileListPlugin = require('./plugins/three.js')
function resolve(pathName) {
  return path.resolve(__dirname, pathName)
}
let publicPath = '/'
module.exports = {
  mode: 'development',
  entry: {
    index: resolve('./src/index.js'),
    demo: resolve('./src/demo.js'),
  },
  output: {
    path: resolve('dist'),
    filename: '[name].[hash:8].js',
    // publicPath,
    chunkFilename: '[name].[hash:8].js',
  },
  module: {
    rules: [ // 解析模块 loader 相关
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
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: resolve('dist')
            },

          },
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {},
        }, ],
      },
      {
        test: /\.md$/,
        use: [
          'html-loader',
          {
            loader: path.resolve('./loaders/md-loader.js'),
            options: {},
          }
        ],
      },
      {
        test: /\.zzc$/,
        use: [
          {
            loader: 'zzc-loader',
            options: {
              type: '-'
            }
          }
        ],
      },

    ]
  },
  resolveLoader: {
    modules: ['node_modules',resolve('./loaders/')]
  },
  resolve: { // 路径相关
    alias: {
      '@': resolve('src'),
      utils: resolve('src/utils'),
    },
    extensions: ['.less', '.css', '.js', '.vue']
  },
  plugins: [ // 插件相关
    new UglifyPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: 'template.html', // 配置文件模板
      inject: true, // 将 js 文件放在哪个位置: (true || 'body')放在body 底部 ，'head'放在头部 
    }), // 更多配置参考 https://github.com/jantimon/html-webpack-plugin
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new CopyWebpackPlugin([{
      from: 'src/copy/1.txt',
      to: 'copy/1.txt',
    }, ]),
    new webpack.ProvidePlugin({
      lodash: ['lodash']
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new FileListPlugin(),
  ],
  devServer: {
    publicPath,
    port: 9000,
    before(app) {
      Mock(app);
    },
    hot: true,
    // proxy: {
    //   '/api': {
    //     target: "http://localhost:3000", 
    //     pathRewrite: { '^/api': '' }, 
    //   },
    // }
  },
  optimization: {
    splitChunks: {
      // chunks: 'all', // 推荐 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
      // 显式指定
      cacheGroups: {
        libs: {
          chunks: "initial", // 表示从哪些块中抽取公共模块 all 所有 initial静态 async异步块
          test: /jquery|axios/,
          name: "libs", // 使用 [name]文件名 作为入口打包成公共部分
          enforce: true, // 始终为此缓存组创建块
        },
      }
    }
  }
}