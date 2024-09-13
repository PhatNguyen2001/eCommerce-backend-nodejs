import app from "./src/app.js";
import dotenv from 'dotenv';

dotenv.config();
const port = 3055 

const server = app.listen(process.env.PORT || port, () => {
    console.log(`app listion on port:${process.env.PORT}`);
})

process.on('SIGINT', () => {
    server.close(() => console.log(`Exit server Express`))
    
})