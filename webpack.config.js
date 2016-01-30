module.exports = {
	entry: './src/index.js',
	output: {
		filename: './dist/bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_module|bower_components)/,
				loader: 'babel',
				query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
			}
		]
	}
};
