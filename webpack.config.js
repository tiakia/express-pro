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

const isProduction = process.env.NODE_ENV === 'prod' ? true : false;

const webpackPlugin = [
  new webpack.BannerPlugin({
    banner: 'Author: tiankai; GitHub: https://github.com/tiakia',
    raw: false
  }),
  new CleanPlugin([path.resolve('public/output/*.js'),path.resolve('public/output/css/*.css')]),
  //开启全局模块热替换
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  //当模块热替换时在浏览器控制台输出对用户更友好的模块名字信息
  new webpack.NamedModulesPlugin(),
  // 提取公共模块
  new CommonsChunkPlugin({
    name:['common','vendor','load'],
    filename: "[name].js",
    minChunks: 2
  }),
  // 提取css
  extractCSS,
  extractLESS,
  extractSCSS,
  new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require(path.resolve('public/output/dist/vendors-manifest.json'))
  })
];


if(isProduction){
     webpackPlugin.push([
         //对最终的js进行 Uglify 压缩
         new UglifyJsPlugin({
            compress: true,
            test: /\.jsx?$/i,
              parallel:{ //使用多进程并行和文件换成提高构建速度
                cache: true,
                workers:2
            },
            warnings: false
         }),
     ]);
}

module.exports = {
  devtool: isProduction ? "eval" : "cheap-module-eval-source-map",
  entry:{
    main: [
      'webpack-hot-middleware/client?reload=true&http://localhost:8080',
      'webpack/hot/only-dev-server',
      path.resolve('./public/src/js/index.js')
    ],
    admin: [
      'webpack-hot-middleware/client?reload=true&http://localhost:8080/admin',
      'webpack/hot/only-dev-server',
      path.resolve('./public/src/js/admin/router.js')
    ]
  },
  output:{
    path: __dirname +'/public/output/',
    filename: '[name].bundle.js',
    publicPath: '/public/output/'
  },
  module: {
    loaders:[
      {
        test: /\.jsx?$/,
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
          publicPath: '/public/output/'
        })
      },
      {
        test: /\.less$/i,
        include: [
          path.resolve(__dirname, "node_modules/antd")
        ],
        use: extractLESS.extract({
          use: ["css-loader","postcss-loader",'less-loader'],
          publicPath: '/public/output/'
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
