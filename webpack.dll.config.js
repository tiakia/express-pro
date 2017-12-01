const webpack = require('webpack');
const library = '[name]_lib';
const path = require('path');

module.exports = {
  entry: {
    vendors: ['react', 'react-dom', 'antd']
  },
  output:{
    filename: '[name].dll.js',
    path: __dirname +'/public/output/dist/',
    library
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '/public/output/dist/[name]-manifest.json'),
      name: library
    })
  ]
}
