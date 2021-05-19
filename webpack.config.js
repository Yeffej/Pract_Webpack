const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtract = require("mini-css-extract-plugin")
const copyPlugin = require("copy-webpack-plugin")

/** @type {import('webpack').Configuration} */

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "Main.js",
        assetModuleFilename: "Images/[hash][ext]"
    },
    resolve: {
        extensions: [".js"],
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_module/,
                use: {
                    loader: "babel-loader"
                }
                
            },
            {
                test: /\.css$/i,
                use: [miniCssExtract.loader, "css-loader"]
            },
            {
                test: /\.png$/i,
                type: "asset/resource"
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            inject: true,
            template: "./public/index.html",
            filename: "index.html"
        }),
        new miniCssExtract(),
        new copyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "Assets/images"
                }
            ]
        })
    ]
}