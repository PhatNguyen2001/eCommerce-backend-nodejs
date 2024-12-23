import app from "./src/app.js";
import { config } from "./src/configs/config.js";
const port = config.app.port
console.log("port",port)

const server = app.listen(process.env.PORT || port, () => {
    console.log(`app listion on port:${process.env.APP_PORT}`);
})

process.on('SIGINT', () => {
    server.close(() => console.log(`Exit server Express`))
})