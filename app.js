if (process.env.NODE_ENV != 'production')
    require('dotenv').config();

const express = require('express');
const config = require('./src/config');
const { hash } = require('./src/helpers/Hasher');
const loaders = require('./src/loaders');
const Admin = require('./src/models/Admin');

(async  () => {
    const app = express();
    const router = express.Router();

    loaders(app, router);

    app.use(express.static('public'));

    app.listen(config.env.port, () => {
        console.log(`Running on port: ${config.env.port}`);
    });
})();
