const path = require('path'),
      HtmlWebPackplugin = require('html-webpack-plugin')

module.exports = {
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { 
                test: /\.js$/, 
                loader: 'babel-loader', 
                exclude: /node_modules/, 
                query: { 
                    presets: ['env', 'react'],
                    plugins: ['transform-class-properties']
                 } 
            },
            { 
                test: /\.css$/, loader: ['style-loader', 'css-loader'] 
            }
        ]
    },
    plugins: [
        new HtmlWebPackplugin({
            template: 'app/index.html'
        })
    ]
}