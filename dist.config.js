module.exports = {
    entry: './src/index.js',
    output: {
        path         : __dirname + '/dist',
        libraryTarget: 'umd',
        library      : 'ReactLookup',
        filename     : 'bundle.js'
    },
    externals: {
        'react': true,
        'react-dom': true,
        'immutable': true,
        'rx': true,
        'classnames': true
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_module|bower_components)/,
				loader: 'babel',
				query: {
				    compact: false,
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
			}
		]
    }
};