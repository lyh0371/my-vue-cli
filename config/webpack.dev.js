const path = require('path'); //文件路径
const os = require('os');
const HTMLWebpack = require('html-webpack-plugin'); //html模板
const VueLoaderPlugin = require("vue-loader/lib/plugin") // vue-loader
const merge = require('webpack-merge'); // 文件合并
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'); //自定义控制台输出

const base = require('./webpack.base');
module.exports = merge(base, {
    mode: 'development',
    devtool: "cheap-module-eval-source-map", // 方便开发模式下的调试
    output: {
        filename: 'index.js'
    },
    module: {
        rules: [
            // 处理less
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            },
            // 处理css
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
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
                            publicPath: '../static/images'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        // 模板
        new HTMLWebpack({
            template: path.resolve(__dirname, '../index.html')
        }),
        //自定义 控制台输出
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: http://${getNetworkIp()}:8887`],
            }
        })
    ],
    devServer: {
        host: getNetworkIp(), // 获取ip地址
        port: 8887,
        overlay:true, // 可以在项目中看到eslint报的错误信息

    },
    stats:'errors-only'
})


function getNetworkIp() {
    let needHost = ''; // 打开的host
    try {
        // 获得网络接口列表
        let network = os.networkInterfaces();
        for (let dev in network) {
            let iface = network[dev];
            for (let i = 0; i < iface.length; i++) {
                let alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    needHost = alias.address;
                }
            }
        }
    } catch (e) {
        needHost = 'localhost';
    }
    return needHost;
}
