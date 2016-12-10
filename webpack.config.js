const path = require('path');
const ngtools = require('@ngtools/webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      "@angular/upgrade/static": "@angular/upgrade/bundles/upgrade-static.umd.js"
    }
  },
  entry: './src/main.ts',
  output: {
    path: path.join(process.cwd(), 'dist'),
    publicPath: 'dist/',
    filename: "bundle.js"
  },
  plugins: [
    new ngtools.AotPlugin({
      tsConfigPath: './tsconfig.json'
    }),
    new CopyWebpackPlugin([
      {
        context: __dirname + '/src/img',
        from: '**/*',
        to: __dirname + '/dist/img/'
      },
      {
        from: __dirname + '/src/index.html',
        to: __dirname + '/dist/'
      }
    ]),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    })
  ],
  module: {
    loaders: [
		{
        test: /\.ts$/,
        loader: '@ngtools/webpack'
      },
	  {
        test: /\.css$/,
      exclude: /node_modules/,
      loader: 'style-loader'
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'raw-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        exclude: /node_modules/,
        loader: 'file'
      }
    ]
  },

  devServer: {
    historyApiFallback: true,
    contentBase: './dist'
  }
};
