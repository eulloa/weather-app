const path = require('path'),
      webpack = require('webpack'),
      HtmlWebPackplugin = require('html-webpack-plugin'),
      ExtendedDefinePlugin = require('extended-define-webpack-plugin'),
      appConfig = require('./app.config')

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
        }),
        new ExtendedDefinePlugin({
            APP_CONFIG: appConfig
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })
    ]
}