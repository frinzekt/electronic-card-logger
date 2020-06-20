const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withSass = require('@zeit/next-sass');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const path = require('path');

module.exports = withPlugins([[withSass], [withImages]], {
	webpack: (config) => {
		config.plugins = config.plugins || [];
		config.resolve.modules.push(path.resolve('./'));
		config.plugins = [
			...config.plugins,

			// Read the .env file
			new Dotenv({
				path: path.join(__dirname, '.env'),
				systemvars: true,
			}),
		];

		return config;
	},
});
