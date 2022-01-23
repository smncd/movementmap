const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/main.ts',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'map.css',
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
        type: 'asset/resource',
        generator: {
          filename: 'assets/[hash][ext][query]'
        }
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
    filename: 'map.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath:
      process.env.NODE_ENV === 'production' ? 'auto' : '/dist',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '/example'),
    },
    compress: true,
    port: 9000,
  },
};
