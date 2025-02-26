const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './js/index.js',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        }),
        new CopyPlugin({
            patterns: [
              { 
                from: path.resolve(__dirname, 'src/assets'), 
                to: path.resolve(__dirname, 'dist/assets') 
              },
              { 
                from: path.resolve(__dirname, 'public/favicon.ico'), 
                to: path.resolve(__dirname, 'dist') 
              },
            ],
          }),
          new MiniCssExtractPlugin(),
    ],

    module: {
        rules: [
          {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, {
              loader: 'css-loader',
              options: {
                url: {
                  filter: (url, resourcePath) => {
                    if (/\.(woff|woff2|eot|ttf|otf)/.test(url)) {
                      return true;
                    }
                    return false;
                  },
                },
              }
          }],
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {


                  url: {
                    filter: (url, resourcePath) => {
                      if (/\.(woff|woff2|eot|ttf|otf)/.test(url)) {
                        return true;
                      }
                      return false;
                    },
                  },
                }
            },
              "sass-loader",
            ],
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
          }
        ],
      },
    
}