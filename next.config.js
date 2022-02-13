const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const nextConfiguration = {
    trailingSlash: true,
};

module.exports = {
    future: {
        webpack5: true,
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.plugins.push(
            new CopyPlugin({
                patterns: [
                    {
                        from: path.join(__dirname, "node_modules/tinymce/skins"),
                        to: path.join(__dirname, "public/assets/libs/tinymce/skins"),
                    },
                    {
                        from: path.join(__dirname, "node_modules/tinymce/themes"),
                        to: path.join(__dirname, "public/assets/libs/tinymce/themes"),
                    },
                    {
                        from: path.join(__dirname, "node_modules/tinymce/icons"),
                        to: path.join(__dirname, "public/assets/libs/tinymce/icons"),
                    },
                ],
            })
        );
        return config;
    },
    webpackDevMiddleware: (config) => {
        return config;
    },
};


module.exports = withPlugins([optimizedImages, nextConfiguration]);