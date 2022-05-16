const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  // 指定webpack打包时使用的模块
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            // 设置babel
            loader: "babel-loader",
            options: {
              presets: [
                [
                  // 指定环境的插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    targets: {
                      chrome: "58",
                      ie: "11",
                    },
                    corejs: "3",
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          'ts-loader'
        ],
        // 要排除的文件模块
        exclude: /node_modules/
      }
    ]
  },
  // 配置插件
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: './src/index.html'
    })
  ],
  // 用来设置引用模块
  resolve: {
    extensions: ['.ts', '.js']
  }
}
