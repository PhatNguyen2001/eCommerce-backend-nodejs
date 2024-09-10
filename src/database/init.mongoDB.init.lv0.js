import mongoose from 'mongoose';

const connection = `mongodb://localhost:27017/eCommerce`
mongoose.connect(connection).then(rs => {
    console.log(`connected MongoDb: port 27017`)
}).catch(err => {
    console.log(`Error Connect`)
});

if(1===0) {
    mongoose.set('debug',true)
    mongoose.set('debug',{ color: true})
}

export default mongoose;