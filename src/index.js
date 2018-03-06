/* eslint-disable no-console*/
import express from 'express';
import { createServer } from 'http';

import constants from './config/constants';
import middlewares from './config/middleware';
import './config/db';

const app = express();

middlewares(app);
const graphQLServer = createServer(app);

graphQLServer.listen(constants.PORT, err => {
    if (err) {
        console.error(err);
    } else {
        console.log(`App running on port: ${constants.PORT}`);
        console.log(`Environment: ${constants.NODE_ENV}`);
    }
});
