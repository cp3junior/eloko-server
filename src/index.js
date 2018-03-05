/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';

import constants from './config/constants';

import './config/db';

const app = express();

app.use(bodyParser.json());

app.listen(constants.PORT, err => {
    if (err) {
        console.error(err);
    } else {
        console.log(`App running on port: ${constants.PORT}`);
    }
});
