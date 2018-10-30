var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var nodeModules = {};
fs.readFileSync('externals', 'utf8').replace(/\n/g, ',').split(',')
    .filter(function(x){
        return x;
    }).forEach(function(mod){
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: './autoTest.js',
    target: 'node',
    output: {
        filename: 'autoTest.js',
        path: path.resolve(__dirname, './build')
    },
    devtool: 'source-map',
    plugins: [
        new UglifyJsPlugin({
            test: /\.js($|\?)/i
        })
    ],
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    },
    externals: nodeModules
};