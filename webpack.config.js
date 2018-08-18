const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const paths = {
  DIST: path.resolve(__dirname, "./dist"),
  SRC: path.resolve(__dirname, "./src"),
  JS: path.resolve(__dirname, "./src/scripts")
};
module.exports = {
  entry: path.join(paths.SRC, "index.js"),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ["css-hot-loader"].concat(
          ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "sass-loader"]
          })
        )
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: paths.DIST,
    publicPath: "/",
    filename: "bundle.js"
  },
  devtool: "source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      inject: false,
      hash: true,
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new ExtractTextPlugin({ filename: "app.min.css" }),
    new webpack.ProvidePlugin({
      React: "react",
      ReactDOM: "react-dom",
      PropTypes: "prop-types",
      _: "lodash"
    })
  ],
  devServer: {
    contentBase: "./dist",
    hot: true,
    port: 3000
  }
};
