module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname,
        filename: 'dist/app.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    }
}