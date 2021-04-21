const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: { index: path.resolve(__dirname, "src", "index.js") },
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "main.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "docs"),
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
        test: /\.(js)$/,
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
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.hbs$/,
        use: [
          {
            loader: "handlebars-loader",
            options: {
              inlineRequires: "/assets/",
              partialDirs: path.resolve(__dirname, "src", "partials"),
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/",
              publicPath: "images/",
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          interpolate: true,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.hbs",
      templateParameters: require("./src/data.json"),
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        handlebarsLoader: {},
      },
    }),
    require("autoprefixer"),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
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
