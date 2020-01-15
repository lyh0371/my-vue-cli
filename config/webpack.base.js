// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // 分析打包结果
const CopyWebpackPlugin = require('copy-webpack-plugin');
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
const path = require('path');
module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                exclude: '/node_modules/',
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src')],
                options: {
                    formatter: require('eslint-friendly-formatter') // 把eslint 的报错信息显示在终端上
                }
            },
            {
                test: /\.(js|jsx)$/i,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                    options: {
                        "babelrc": false,// 不采用.babelrc的配置
                        "plugins": [
                            "dynamic-import-webpack"
                        ],
                        presets: ['@babel/preset-env']
                    }
                }
            },
            // 处理vue
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.vue', '.ts', '.tsx', '.js', '.json'],
        alias: {
            root: path.resolve(__dirname, '../src') // 设置根路径
        }

    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: 'static',
                ignore: ['.*']
            }
        ])

    ]

}
