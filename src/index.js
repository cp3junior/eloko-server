/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { createServer } from 'http';

import constants from './config/constants';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import mocks from './mocks';

import './config/db';

const app = express();

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

app.use(bodyParser.json());
app.use(
    constants.GRAPHQL_PATH,
    graphqlExpress({
        schema,
    }),
);
app.use(
    '/graphiql',
    graphiqlExpress({
        endpointURL: constants.GRAPHQL_PATH,
    }),
);

const graphQLServer = createServer(app);

mocks().then(() => {
    graphQLServer.listen(constants.PORT, err => {
        if (err) {
            console.error(err);
        } else {
            console.log(`App running on port: ${constants.PORT}`);
            console.log(`Environment: ${constants.NODE_ENV}`);
        }
    });
});