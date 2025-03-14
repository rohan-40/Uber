const mongoose = require('mongoose');
require('dotenv').config();

const MongoURL = process.env.MongoURL;

mongoose.connect(MongoURL, );

const db = mongoose.connection;

db.on('connected',() =>{
    console.log("Connected to MongoDB");
})
db.on('error',(err) =>{
    console.log("Internal Error: ", err);
})
db.on('disconnected', () => {
    console.log("Disconnected from MongoDB");
})

module.exports = db;