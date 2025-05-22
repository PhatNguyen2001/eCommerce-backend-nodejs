const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
// const compression = require('compression');
const Database = require('./database/mongoDb.js');
const router = require('./routes/index.js');

const app = express();

//init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// app.use(compression());  

//init database
Database.getInstance();
// const { countConnect } = require('./helper/check.connect.js');
// countConnect();
// checkOverLoad();

//init routes
app.use('/', router);

//handling error
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    console.log("Err app use::")
    const status = err.status || 500
    return res.status(status).json({
        status: 'error',
        code: status,
        message: err.message || 'Internal server'
    })
})

module.exports = app;  