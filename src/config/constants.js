const defaultConfig = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV,
    GRAPHQL_PATH: '/graphql',
};

const configuration = {
    development: {
        DB_URL: 'mongodb://localhost/elokodb',
    },
    production: {
        DB_URL: 'mongodb://localhost/elokodb',
    },
};

function getEnv(env) {
    return configuration[env];
}
export default {
    ...defaultConfig,
    ...getEnv(defaultConfig.NODE_ENV),
};