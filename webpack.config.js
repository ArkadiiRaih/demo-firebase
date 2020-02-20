const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = ({ mode } = { mode: "development" }) => ({
  mode,
  entry: {
    index: ["babel-polyfill", "./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[hash].js"
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/static/css/"
            }
          },
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /.svg$/,
        loader: "file-loader",
        options: {
          outputPath: "/assets"
        }
      }
    ]
  },
  devServer: {
    contentBase: "./build",
    compress: true,
    port: 9000,
    watchContentBase: true,
    progress: true
    // historyApiCallback: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "/static/css/[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
});
