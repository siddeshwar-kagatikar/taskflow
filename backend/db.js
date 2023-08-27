const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/schedule'

const connecttoMongo = () => {
    console.log('connected to mongo')
    mongoose.connect(mongoURI);
}

module.exports = connecttoMongo


