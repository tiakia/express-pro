const webpack = require('webpack');
const path = require('path');
const CommonsChunkPlugin = require('webpack/lib/optimize/Commonschunkplugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CleanPlugin = require('clean-webpack-plugin');

const extractCSS = new ExtractTextPlugin('css/[name]-css.css');
const extractLESS = new ExtractTextPlugin('css/[name]-less.css');
const extractSCSS = new ExtractTextPlugin('css/[name]-scss.css');

const webpackPlugin = [
  new webpack.BannerPlugin({
    banner: 'Author: tiankai',
    raw: false
  }),
  new CleanPlugin([path.resolve('public/output/*.js'),path.resolve('public/output/css/*.css')]),
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
  // new ExtractTextPlugin({
  //   filename: 'css/style.css',
  //   allChunks: true
  // }),
  extractCSS,
  extractLESS,
  extractSCSS,
  new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require(path.resolve('public/output/dist/vendors-manifest.json'))
  })
];

module.exports = {
  devtool: "cheap-module-eval-source-map",
  entry:{
    main: path.resolve('./public/src/js/index.js'),
    admin: path.resolve('./public/src/js/admin/router.js')
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
        loader: extractCSS.extract('style-loader','css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]!postcss-loader')
      },
      {
        test: /\.scss$/i,
        include: [
          path.resolve(__dirname, "public/src/css")
        ],
        use: extractSCSS.extract({
          fallback: 'style-loader',
          use: ["css-loader","postcss-loader","sass-loader"],
          publicPath: './public/output/'
        })
      },
      {
        test: /\.less$/i,
        include: [
          path.resolve(__dirname, "node_modules/antd")
        ],
        use: extractLESS.extract({
          use: ["css-loader","postcss-loader",'less-loader'],
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
