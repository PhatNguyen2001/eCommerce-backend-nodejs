const app = require('./src/app.js');
const { config } = require('./src/configs/config.js');

const port = config.app.port;
console.log("port", port);

const server = app.listen(process.env.PORT || port, () => {
    console.log(`app listening on port:${process.env.APP_PORT || port}`);
});

process.on('SIGINT', () => {
    server.close(() => console.log(`Exit server Express`));
});