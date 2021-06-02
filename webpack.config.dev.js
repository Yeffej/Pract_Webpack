const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtract = require("mini-css-extract-plugin")
const copyPlugin = require("copy-webpack-plugin")
const DotEnv = require("dotenv-webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")


/** @type {import('webpack').Configuration} */

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "Main.js",
        assetModuleFilename: "Images/[hash][ext]",
    },
    mode: "development",
    devtool: "source-map",
    resolve: {
        extensions: [".js"],
        alias: {
            "@styles": path.resolve(__dirname, "src/styles"),
            "@fonts": path.resolve(__dirname, "src/assets/fonts"),
            "@images": path.resolve(__dirname, "src/assets/images"),
            "@utils": path.resolve(__dirname, "src/utils"),
            "@templates": path.resolve(__dirname, "src/templates"),
        }
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
            },
            {
                test: /\.(woff|woff2)$/i,
                type: "asset/resource",
                generator: {
                    filename: "Assets/fonts/[name][ext]"
                }
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
        }),
        new DotEnv(),
        new BundleAnalyzerPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        historyApiFallback: true,
        open: true,
        port: 3006
    }
}