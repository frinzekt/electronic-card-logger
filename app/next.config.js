const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withSass = require('@zeit/next-sass');
const webpack = require('webpack');
const path = require('path');

module.exports = withPlugins([[withSass], [withImages]], {
	webpack(config, options) {
		config.resolve.modules.push(path.resolve('./'));
		return config;
	},
	env: {
		PORT: 3001,
		origin: 'http://localhost:3000',
		socketURL: 'http://localhost:8000',
		mongoURI: 'mongodb+srv://frinzelapuz:Winlin123@flapuz-9bwfa.azure.mongodb.net/test?retryWrites=true&w=majority',
		mongoDBName: 'IOT',
		mongoCollectionName: 'ECL_Logs',
	},
});
