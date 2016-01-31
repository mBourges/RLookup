module.exports = {
	entry: './examples/script.js',
	output: {
		filename: './examples/bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_module|bower_components)/,
				loader: 'babel',
				query: {
					compact: false,
                    cacheDirectory: false,
                    presets: ['es2015', 'react']
                }
			}
		]
	}
};
