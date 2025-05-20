'use strict'
// Thay từ import thành require
const mongoose = require('mongoose');
const process = require('process');
const os = require('os');

const countConnect = () => {
    const numConnection = mongoose.connections.length;
    console.log(`number of connections: ${numConnection}`);
}

// check overload
const _SECONDS = 5000;

const checkOverLoad = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length;
        const numCore = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;

        const maxConnections = numCore * 5;

        console.log(`Active connections: ${numConnection}`);
        console.log(`memory usage: ${memoryUsage / 1024 / 1024} MB`);

        if (numConnection > maxConnections) {
            console.log(`connection overload detected!`);
        }
    }, _SECONDS);
}

module.exports = { countConnect, checkOverLoad };