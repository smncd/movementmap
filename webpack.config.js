const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: './main.ts',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'movementmap.css',
    }),
    new CssMinimizerPlugin(),
  ],
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(jpe?g|png)$/,
        type: 'asset/inline',
      },
      {
        test: /\.svg$/,
        use: 'raw-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss', '.css'],
  },
  output: {
    filename: 'movementmap.js',
    path: path.resolve(
      __dirname,
      process.env.NODE_ENV === 'production' ? 'dist' : 'dist-dev'
    ),
    publicPath: process.env.NODE_ENV === 'production' ? 'auto' : '/',
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '/example'),
    },
    compress: true,
    port: 9000,
  },
};
