module.exports = {
    entry: './node_modules/ciena-dagre/index.js',
    output: {
        path: __dirname + '/libs/ciena-dagre/',
        filename: 'ciena-dagre.bundle.js',
        library: 'dagre',
        libraryTarget: 'var'
    },
    externals: {
        lodash: '_'
    }
};

