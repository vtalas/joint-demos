module.exports = {
    entry: './node_modules/ciena-dagre/src/index.js',
    output: {
        path: __dirname + '/lib/ciena-dagre',
        filename: 'ciena-dagre.bundle.js',
        library: 'dagre',
        libraryTarget: 'var'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    externals: {
        'lodash': '_',
        'graphlib': 'graphlib'
    }
}
