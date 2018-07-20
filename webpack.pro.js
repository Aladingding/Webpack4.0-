// http://www.alloyteam.com/2016/01/webpack-use-optimization/
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const manifest = require('./app/source/build/vendor.manifest.json');
const dllchunkname = manifest.name.split('_')[1];

module.exports = {
    mode: 'production',
    entry:{
        index: path.resolve(__dirname,'./app/source/entry/index.js'),
        // index2 : path.resolve(__dirname,'./app/source/entry/index2.js'),
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname,'./app/source/build/'),
    },
    stats: {
        colors: true,
        version: true,
    },
    plugins:[
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./app/source/build/vendor.manifest.json')
        }),
        new HtmlWebpackPlugin({
            title: 'React-router && webpack4.0+',
            template: './app/source/html/index.ejs', // html模板文档地址，webpack默认模板为ejs
            filename: 'index.html', // 由模板生成的文件名和存放位置，可带路径的？需要去官网文档看下
            author: 'tomy',
            // hash: true,
            inject: 'true',// 资源文件注入位置true,body,header,false
            vendor: /*manifest.name*/'vendor.dll.'+dllchunkname + '.js' //manifest就是dll生成的json
        }),
        // new HtmlWebpackIncludeAssetsPlugin({
        //     file:['./app/source/build/vendor.dll.*.js'],
        //     assets: [
        //         'vendor.dll.*.js'
        //     ], append: false
        // }),
        // new AddAssetHtmlPlugin({
        //     filepath:
        //         path.resolve(__dirname, './app/source/build/vendor.dll.*.js'),
        //
        //        // require.resolve('./app/source/build/vendor.dll.7b4918eae9e5a132f4b6.js')
        // }),
        new CleanWebpackPlugin([
                './app/source/build/index.*.js',
                '!./app/source/build/manifest.*.json',
                '!./app/source/build/vendor.*.*.js',
                '!./app/source/build/vendor.*.js'
            ],
            {
                root: __dirname, // webpack文件夹的绝对路径,Default: root of your package
                verbose: false,
                exclude: ['manifest.json'],// 无法排除指定正则文件格式,so,要排除从第一个参数吧
            }
        ),
    ],
    // 抽离公共模块 https://blog.csdn.net/github_26672553/article/details/52280422
    // https://blog.csdn.net/connie_0217/article/details/79760054
    // 需要多入口引入的才会抽离业务公共包？


    // https://blog.csdn.net/connie_0217/article/details/79760054


    // https://blog.csdn.net/qq_26733915/article/details/79458533
    // https://blog.csdn.net/qq_26733915/article/details/79458533
    // https://blog.csdn.net/qq_26733915/article/details/79458533
    // https://blog.csdn.net/qq_26733915/article/details/79458533
    // https://blog.csdn.net/qq_26733915/article/details/79458533
    // https://blog.csdn.net/qq_26733915/article/details/79458533


    // https://www.cnblogs.com/ufex/p/8758792.html
    optimization: {
        splitChunks: {
            // chunks: 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all
            cacheGroups: {
                // 需要缓存的公共模块
                commons: {
                    //  https://blog.csdn.net/github_36487770/article/details/80228147
                    // 抽离从node_modules文件夹中引入的模块为一个单独的模块，比如lodash
                    // test: /[\\/]node_modules[\\/]/,
                    // 抽离出来公共模块的名称，文件名
                    name: 'commons',//'commons',
                    // async 对异步加载的模块，抽离重复引用,all 对所有chunks抽离公共组件 ,initial 初始模块
                    chunks: 'all',
                    // 分割的最小颗粒度，超过两个文件引入同一模块，才抽离该模块为公共组件
                    minChunks: 2
                }
            }
        }
    },
    module:{
        rules:[
            {
                // 需要检查打包的各种js资源文件
                test: /(\.jsx|\.js|\.es6)$/,
                // 排除查找模块的目录
                use: {
                    loader: 'babel-loader',
                    options: {
                        //presets: ['@babel/preset-react'],
                        // presets: [['es2015', {modules: false}]],
                        // plugins: ['syntax-dynamic-import']

                        //presets: [['es2015', {modules: false}]],

                        // presets:[
                        //     "stage-1",
                        //     "react"
                        // ],
                        //"presets": ["@babel/preset-env","react"],
                        "presets": ["@babel/preset-env","@babel/preset-react"],
                        // "presets": [
                        //     ["es2015", {"loose": true}],
                        //     "stage-1",
                        //     "react"
                        // ],
                        plugins: [
                            'syntax-dynamic-import',
                            'transform-async-to-generator',
                            'transform-regenerator',
                            'transform-runtime'
                        ]
                    }
                },
                // options: {
                //     presets: ['@babel/preset-react'],
                //     //plugins: ['@babel/plugin-transform-runtime']
                // }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader?modules' },
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use:[
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            },
        ],
    },
};