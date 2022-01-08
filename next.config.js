const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const nextConfiguration = {
    // target: 'serverless',
    trailingSlash: true,
    // historyApiFallback: true
};
module.exports = withPlugins([optimizedImages, nextConfiguration]);

