const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "./src"),
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "template.html"),
      filename: "index.html",
    }),
  ],
  devServer: {
    watchFiles: path.join(__dirname, "src"),
    port: 9000,
  },
};
