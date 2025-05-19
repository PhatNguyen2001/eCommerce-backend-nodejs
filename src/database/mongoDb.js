import mongoose from 'mongoose';
import { countConnect } from '../helper/check.connect.js';
import { config } from '../configs/config.js';

export default class Database {
    connection = `mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}?authSource=admin`
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
            console.log(`connected MongoDb: port ${config.db.port}`, countConnect())

        }).catch(err => {
            console.log(`Error Connect`)
            console.log(err)
            console.log(this.connection)
        });
    }
}

// export const instanceMongo = Database.getInstance()
