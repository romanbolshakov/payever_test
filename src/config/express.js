const express = require('express');
const bodyParser = require('body-parser');
const api = require('../api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

const testRoute = express.Router();
testRoute.get('/test', (req, res) => res.send('OK'));
app.use('/', testRoute);

app.use('/api', api);

module.exports = app;