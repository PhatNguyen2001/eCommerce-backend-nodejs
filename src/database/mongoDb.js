import mongoose from 'mongoose';
import { countConnect } from '../helper/check.connect.js';
class Database {
    connection = `mongodb://localhost:27017/eCommerce`
    constructor(){
        this.connect()
    }

    static getInstance() {
        if(!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }

    connect(type = 'mongodb') {    
        if(1===0) {
            mongoose.set('debug',true)
            mongoose.set('debug',{ color: true})
        }

        mongoose.connect(this.connection).then(rs => {
            console.log(`connected MongoDb: port 27017`, countConnect())

        }).catch(err => {
            console.log(`Error Connect`)
        });
    }
}

export const instanceMongo = Database.getInstance()
