const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    plugins: [new webpack.ProgressPlugin()],

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                include: [path.resolve(__dirname, 'src')],
                exclude: [/node_modules/]
            },
            {
                test: /.css$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',

                    options: {
                        sourceMap: true
                    }
                }]
            }]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
};
