import app from "./src/app.js";

const port = 3055 

const server = app.listen(port, () => {
    console.log(`app listion on port:${port}`);
})

process.on('SIGINT', () => {
    server.close(() => console.log(`Exit server Express`))
    
})