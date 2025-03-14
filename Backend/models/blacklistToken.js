const mongoose = require('mongoose');

const blacklist = mongoose.Schema({
    token:{
        type: String,
        required: true,
        unique: true
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        expires: 86400 // 24hours
    }
})

const BlacklistToken = mongoose.model('BlacklistToken', blacklist);
module.exports = BlacklistToken;