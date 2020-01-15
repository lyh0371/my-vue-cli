const path = require('path');
const HTMLWebpack = require('html-webpack-plugin');
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // css 压缩
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 去掉打印
const ShakePlugin = require('webpack-common-shake').Plugin; //项目瘦身
const merge = require('webpack-merge');
const base = require('./webpack.base');
module.exports = merge(base, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: './static/js/[name]_[hash:7].js'
    },
    module: {
        rules: [
            // 处理less
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        }
                    },
                    "css-loader",
                    "less-loader"
                ]
            },
            // 处理css
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../',
                    }

                }, "css-loader"]

            },
            // 处理图片
            {
                test: /\.(jpg|png|gif|jpeg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100,
                            name: '[name]_[hash:7].[ext]',
                            outputPath: './static/images',
                            publicPath: '../images'
                        }
                    }
                ]
            }
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                venders: {
                    test: /node_modules/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new OptimizeCssAssetsPlugin(), //css压缩
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new HTMLWebpack({
            template: path.resolve(__dirname, '../index.html'),
        }),
        // css分离
        new MiniCssExtractPlugin({
            filename: './static/css/[name].[hash].css',
        }),
        // 去掉打印
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    drop_console: true
                }
            }
        }),
        new ShakePlugin(), //删除无用的代码 给项目瘦身



    ]
})
