const path = require('path');

module.exports = {
    entry: {
        main:'./src/index.tsx',
        admin:'./src/admin.tsx'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../wwwroot'),
        publicPath: "/"
    },
    resolve:{
        extensions: ['.ts', '.tsx', '.js', ".jsx"]
    },
    devtool: 'inline-source-map',
    devServer: {
        port: 3000,
        disableHostCheck: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader',
                ],
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader',
                ],
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader", 'eslint-loader']
            },
        ],
    },
};