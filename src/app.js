import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet'
import compression from 'compression';
import { instanceMongo } from './database/mongoDb.js'
const app = express();

//init middleware
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())

//init database
// const { countConnect } = require('./helper/check.connect.js')
// countConnect()
// checkOverLoad()

//init routes
app.get('/', (req,res,next) => {
    const compressStr = "demo"
    return res.status(200).json({
        message: "Demo",
        metadata: compressStr.repeat(10000)
    })
} )
//handling error


export default app