const path = require("path");
const dotenv = require("dotenv");

const webpack = require("webpack");

const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    // Enable webpack find ts and tsx files without an extension
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },

    hot: true,
    historyApiFallback: { index: "index.html" },
  },
  plugins: [new webpack.DefinePlugin(envKeys)],
};
