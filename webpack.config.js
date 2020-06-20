const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [{
  entry: './src/index.ts',
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    compress: true,
    port: 9000,
    open: true,
    index: 'index.html',
    contentBase: path.join(__dirname, 'dist'),
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.worker\.ts$/,
        use: { loader: 'worker-loader' }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: '[hash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  }
}];