const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/js"),
    publicPath:'./static/js',
    filename:'[name].js',
  },
 
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          // options:{
          //   presents:["@babel/preset-env","@babel/preset-react"]
          // }
        },
      },
    ],
  },
  devServer:{
    liveReload:true
  },
  mode: 'development'
  // optimization: {
  //   minimize: true,
  // },
  // plugins: [
  //   new webpack.DefinePlugin({
  //       "process.env": {
  //         // This has effect on the react lib size
  //         NODE_ENV: JSON.stringify("development"),
  //       },
  //     }),
  // ],
};