// eslint-disable-next-line no-unused-vars
var path = require("path");
// eslint-disable-next-line no-unused-vars
var webpack = require("webpack");
// eslint-disable-next-line no-unused-vars
var HtmlWebpackPlugin = require("html-webpack-plugin");
var autoprefixer = require ("autoprefixer");
var ManifestPlugin = require("webpack-manifest-plugin");
require("babel-polyfill");
module.exports = {
    entry: {
        
        vendor:[
            "babel-polyfill",
            "react",
            "react-dom",
            "react-router-dom",
            "redux",
            "axios"

        ],
        app:[require.resolve("react-dev-utils/webpackHotDevClient"),"./src/index.js"]
    },
        
    mode:"development",
    output: {
        publicPath: "/",
        path: path.resolve("./public/"),
        filename: "[name].[hash].js",
        chunkFilename: "[name].[chunkhash].chunk.js"
    },

    devServer: {
        inline: true,
        hot: true,
        contentBase: __dirname +"../public/",
        historyApiFallback: true,
        proxy: {
            "/api/" : {
                target: "http://localhost:3001",
                changeOrigin : true
            }
        }
    },
    resolve: {
        extensions: [".js", ".json", ".jsx"]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: "initial",
                    name: "vendor",
                    enforce: true
                },
            },
        }
    },
    plugins: [

        new ManifestPlugin({
            fileName: "assets.json",
            basePath: "/"
        }),
        new HtmlWebpackPlugin(
            Object.assign(
                {},
                {
                    inject: true,
                    template: path.resolve(__dirname, "../public/index.html"),
                },
            )
        )

    ],
    
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    require.resolve("style-loader"),
                    {
                        loader: require.resolve("css-loader"),
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: "[path][name]__[local]--[hash:base64:5]",
                            
                            }
                        },
                    },
                    {
                        loader: require.resolve("postcss-loader"),
                        options: {
                            // Necessary for external CSS imports to work
                            ident: "postcss",
                            plugins: () => [
                                require("postcss-flexbugs-fixes"),
                                autoprefixer({
                                    Browserslist: [
                                        ">1%",
                                        "last 4 versions",
                                        "Firefox ESR",
                                        "not ie < 9", // React doesn't support IE8 anyway
                                    ],
                                    flexbox: "no-2009",
                                }),
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg|png|jpeg|jpg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "fonts/",
                        //publicPath: "../",
                        //useRelativePaths: true
                    }
                }]
            },

            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader", 
                options: {
                    fix: false,
                }
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /(node_modules|bower_components)/,
                options: {
                    cacheDirectory: true,
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            },
            {
                test: /\.jsx?$/,
                loader: "eslint-loader",
                enforce: "pre",
                exclude: /node_modules/
            },
            {
                test: /\.styl$/,
                loader: "stylint-loader",
                enforce: "pre"
            },
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react"
                    ]
                },
                exclude: /(node_modules|bower_components)/
            }
        ]
    }
};
