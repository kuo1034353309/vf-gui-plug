const path = require('path');
const webpack = require('webpack');


module.exports = {
    
    mode: 'development',
    devtool: 'source-map',
    entry: './index.js',
    plugins:[

    ],
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: 'ts-loader',
                exclude: [/node_modules/]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'test.js',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, '../dist')
    },
};