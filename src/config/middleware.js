/* eslint-disable  prefer-arrow-callback*/
/* eslint-disable  no-param-reassign*/
import bodyParser from 'body-parser';
import cors from 'cors';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './../graphql/schema';
import resolvers from './../graphql/resolvers';
import constants from './constants';
import { decodeToken } from '../services/auth';

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

async function auth(req, res, next) {
    try {
        const token = req.headers.authorization;
        if (token != null) {
            const user = await decodeToken(token);
            req.user = user;
        } else {
            req.user = null;
        }
        return next();
    } catch (e) {
        throw e;
    }
}

export default app => {
    app.use(cors());
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept',
        );
        next();
    });
    app.use(bodyParser.json());
    app.use(auth);
    app.use(
        '/graphiql',
        graphiqlExpress({
            endpointURL: constants.GRAPHQL_PATH,
        }),
    );
    app.use(
        constants.GRAPHQL_PATH,
        graphqlExpress(req => ({
            schema,
            context: {
                user: req.user,
            },
        })),
    );
};
