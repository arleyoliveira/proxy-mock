const express = require('express');
const routers = require('./routers');
var cors = require('cors')

require('./config/databaseConfig')();

const app = express();

app.use(cors({
    origin:"*",
    methods:['GET']
}))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(routers);

module.exports = app;