const { config } = require('dotenv');

config();

module.exports = {
    webpack(config) {
        config.resolve.modules.push(__dirname);
        return config;
    },
    env: {
        API_KEY: process.env.API_KEY,
        DATABASE_URL: process.env.DATABASE_URL
    }
};
