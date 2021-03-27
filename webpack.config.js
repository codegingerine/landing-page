const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: { index: path.resolve(__dirname, "index.js") },
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "main.js",
  },
  devServer: {
    contentBase: "./docs",
    historyApiFallback: true,
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 1000,
    poll: 2000,
    ignored: "**/node_modules",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|woff|woff2|eot|ttf)$/,
        loader: "url-loader",
      },
      {
        test: /\.html$/,
        use: [
          "html-loader",
          {
            loader: "posthtml-loader",
            options: {
              plugins: [
                require("posthtml-include")({
                  root: path.resolve(__dirname, "src/partials"),
                }),
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })],
  performance: {
    hints: false,
  },
  optimization: {
    splitChunks: {
      minSize: 10000,
      maxSize: 250000,
    },
  },
};
