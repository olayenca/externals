const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const autoprefixer = require("autoprefixer");
const ServiceWorkerWebpackPlugin = require("serviceworker-webpack-plugin");

module.exports = env => ({
    mode: env,
    entry: {
        vanilla: "./src/main.js",
        react: "./src/index.js"
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "build"),
        publicPath: env === "production" ? "./" : "/"
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(env),
                PUBLIC_URL: JSON.stringify("/build/"),
                SKIP_PREFLIGHT_CHECK: true
            }
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: "./public/index.html",
            filename: "./index.html",
            chunks: ["vanilla"],
            favicon: "./public/favicon.ico",
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
            ignoreOrder: false
        }),
        new CopyWebpackPlugin([
            { from: "public/assets/dockerAssets"}
        ])
    ],
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                include: [path.resolve(__dirname, "src")],
                loader: "babel-loader",
                options: {
                    plugins: ["syntax-dynamic-import"],
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                modules: false
                            }
                        ],
                        [
                            "@babel/preset-react",
                            {
                                modules: false
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.(gif|jpe?g|svg|ico)$/i,
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]"
                }
            },
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "resolve-url-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: [autoprefixer()]
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "resolve-url-loader"
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: ["svg-loader"]
            },
            {
                test: /\.(eot|woff|woff2|svg|ttf|otf)([\?]?.*)$/,
                use: ["file-loader?name=[name].[ext]"]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|ico)$/,
                use: ["url-loader"]
            }
        ]
    },
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
        hints: false
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    priority: -10,
                    test: /[\\/]node_modules[\\/]/
                }
            },

            chunks: "async",
            minChunks: 3,
            minSize: 30000,
            name: true
        }
    }
});
