'use strict'
import dotenv from 'dotenv';
dotenv.config();
export const config = {
    app: {
        port: process.env.APP_PORT
    },
    db: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT|| 0),
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    } 
}

