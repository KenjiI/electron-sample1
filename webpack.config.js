module.exports = {
  target: "electron",
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.png$/,
        loader: "file-loader?name=./images/[name].[ext]",
      },
      {
        test: /\.node$/,
        loader: "node-loader"
      },
    ]
  },
  entry: {
    "main/index": "./src/main/index.js",
    "renderer/app": "./src/renderer/app.jsx"
  },
  output: {
    filename: "js/[name].js",
    path: "dist/"
  }
};
