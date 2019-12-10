const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/client/index.tsx',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'client'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title:"Survey Tool"
    })
  ],
  module:{
    rules:[
      {
        test:"/\.css$/",
        use:[
          "style-loader",
          "css-loader"
        ]
      }
    ]
  },
  mode: "production",
};