module.exports = {
    entry: './ts/app.tsx',
    output: {
        filename: '[name].js',
        path: __dirname + '/js'
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    }
};