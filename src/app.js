import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet'
// import compression from 'compression';
import Database from './database/mongoDb.js'
import { router } from './routes/index.js';
const app = express();

//init middleware
app.use(morgan("dev"))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// app.use(compression())
//init database
Database.getInstance()
// const { countConnect } = require('./helper/check.connect.js')
// countConnect()
// checkOverLoad()

//init routes
app.use('/api/v1',router)
//handling error


export default app