//ES 5 import 
// 'use strict'
// const mongoose = require('mongoose')

import mongoose from "mongoose"
import process from "process"
import os from "os"

export const countConnect = () => {
    const numConnection = mongoose.connect.length
    console.log(`number of connections: ${numConnection}`)  
}

//check overrload
const _SECONDS = 5000 

export const checkOverLoad = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length
        const numCore = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        // Example maximun number of connection based on number of core 
        const maxConnections = numCore * 5;
        console.log(`Active connections::${numConnection}`)
        console.log(`memory useage:: ${memoryUsage / 1024 / 1024}MB`)
        if(numConnection > maxConnections) {
            console.log(`connection overload detected!`)
        }
    },_SECONDS) 
}

// module.exports = { countConnect }