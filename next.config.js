const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
module.exports = {
    exportTrailingSlash: true
}
module.exports = withPlugins([optimizedImages], { target: 'serverless' });
