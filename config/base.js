const path = require('path');

module.exports = {
    mode: 'development',//production,development
    devtool: 'source-map',
    entry: {
        FilterAlpha: './packages/filterAlpha/src/FilterAlpha.ts',
        TestButton: './packages/testButton/src/TestButton.ts',
    },
    module: {
        rules: [
            {
                test: /\.(frag|vert|glsl)$/,
                use: [
                    {
                        loader: 'raw-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.(mp3|svg|png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts','.js']
    },
    output: {
        filename: '[name].js',
        library: ['vf','gui','plugs'],
        libraryTarget: "umd",
        path: path.resolve(__dirname, `../dist/`),
    },
    plugins: [],
};