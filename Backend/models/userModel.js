const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength: [4 , 'Firstname must be at least 4 characters long' ]
        },
        lastname:{
            type: String,
            minlength: [3 , 'Lastname must be at least 3 characters long' ]
        }
    },
    email:{
        type: String,
        require: true,
        lowercase: true,
        minlength: [10 , 'Email must be at least 10 characters long' ],
        unique: true
    },
    password:{
        type: String,
        require: true,
        minlength: [6 , 'Password must be at least 6 characters long' ],
        select: false
    },
    socketId:{
        type: String
    }
})

userSchema.methods.comparePassword = async function (password) {
    try{
        const isMatch = await bcrypt.compare(password,this.password);
        return isMatch;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10); 
}
 
const user = mongoose.model('user',userSchema);
module.exports = user;


