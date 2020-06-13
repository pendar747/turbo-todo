const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = [{
  entry: './src/index.ts',
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new CopyPlugin({
      patterns: [
        { 
          context: 'src/views', 
          from: '**/*', 
          to: path.resolve(__dirname, 'dist/views') 
        },
      ],
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
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  }
}];