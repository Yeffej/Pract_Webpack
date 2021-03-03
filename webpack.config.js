const path = require("path")

/** @type {import('webpack').Configuration} */

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "Main.js"
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
                
            }
        ]
    }
}