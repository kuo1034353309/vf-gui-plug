const path = require('path');
const fs = require('fs');

module.exports = {
    mode: 'development',//production,development
    devtool: 'source-map',
    entry: {},
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
        library: ['vf','gui','module'],
        libraryTarget: "umd",
        path: path.resolve(__dirname, `../dist/`),
    },
    plugins: [],
};

const basePackages = path.resolve(__dirname,'../packages/');
const packages = fs.readdirSync(basePackages);
packages.forEach(element => {
    module.exports.entry[element] = basePackages + '/' +element + '/src/index.ts';
});