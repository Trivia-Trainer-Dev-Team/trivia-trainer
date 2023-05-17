const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },

  devServer: {
    open: true,
    hot: true,
    // liveReload: true,
    historyApiFallback: true,
    proxy: {
      '/users/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/questions/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },

  module: {
    rules: [
      // babel loaders
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      // css loaders
      {
        test: /scss/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './public/index.html'),
    }),
  ],
};
