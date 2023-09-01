const express = require('express');
const morgan = require('morgan');
const {default: helmet} = require('helmet')
const compression = require('compression')
const app = express();

//console.log(`Process::`, process.env)
//init middlewares
app.use(morgan("combined"))
app.use(helmet())
app.use(compression())
//init db
require('./dbs/init.mongodb')
//init router
app.use('/', require('./routes'))
//handling error

module.exports = app