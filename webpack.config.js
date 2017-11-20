const webpack = require('webpack');
const path = require('path');
const CommonsChunkPlugin = require('webpack/lib/optimize/Commonschunkplugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const webpackPlugin = [
  new webpack.BannerPlugin({
    banner: 'Author: tiankai',
    raw: false
  }),
  //开启全局模块热替换
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  // 提取公共模块
  new CommonsChunkPlugin({
    name:['common','vendor','load'],
    filename: "[name].js",
    minChunks: 2
  }),
  // 提取css
  new ExtractTextPlugin({
    filename: 'css/style.css',
    allChunks: true
  })
];

module.exports = {
  devtool: "cheap-module-eval-source-map",
  entry:{
    main: path.resolve('./public/src/js/index.js'),
    vendor: ['react','react-dom']
  },
  output:{
    path: __dirname +'/public/output/',
    filename: '[name].bundle.js',
    publicPath: './public/output/'
  },
  module: {
    loaders:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test:/\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
          publicPath: './public/output/'
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ["css-loader","postcss-loader","sass-loader"],
          publicPath: './public/output/'
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: './public/image/[name]-[hash:5].[ext]'
            }
          },
          "image-webpack-loader"
         ]
      },
      {
        test: /\.(woff|ttf|eot)$/,
        loader: "url-loader",
        query: {
          limit: 20480
        }
      }
    ]
  },
  plugins: webpackPlugin
}
