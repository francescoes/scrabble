module.exports = {
    entry: './index.js',
    output: {
        filename: 'dist/bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.html$/,
            loader: "html-loader"
        }]
    }
}
