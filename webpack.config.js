const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
//   entry: './src/index.js',
mode:'development',
entry:{
      // feather: './node_modules/feather-icons/dist/feather.js',
      index: './src/index.js',
      
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  plugins:[
      new HtmlWebpackPlugin({
          title: 'Device Care',
      }),

  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'feather',
    // Prevents webpack from referencing `window` in the UMD build
    // Source: https://git.io/vppgU
    globalObject: "typeof self !== 'undefined' ? self : this",
    clean:true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader','postcss-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};