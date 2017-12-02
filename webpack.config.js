module.exports = {
	entry: './src/main.js',
	output: {
		path: __dirname,
		filename: 'dist/app.js'
	},
	module: {
		loaders: [
			{test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
			{test: /\.vue$/, loader: 'vue-loader'},
			{test: /\.css$/, loader: 'css-loader!style-loader'},
			{test: /\.(png|gif|jpeg|jpg|ttf)$/, loader: 'file-loader'}
		]
	}
}
