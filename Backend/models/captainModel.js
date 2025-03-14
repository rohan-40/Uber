const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required: true,
            minlength : [4, 'Firstname must be at least 4 character']
        },
        lastname:{
            type: String,
            minlength: [3, 'Lastname must be at least 3 character']
        }
    },
    email:{
        type: String,
        required: true,
        minlength: [10 , 'Email must be at least 10 character'],
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        requied: true,
        select:false,
        minlength: [6, 'Password must be at least 6 character']
    },
    soketId:{
        type:String,
    },
    status:{
        type: String,
        enum: ['active','inactive'],
        default: 'inactive'
    },
    vehicle:{
        color:{
            type: String,
            requied: true,
            minlength: [3, 'Color must be at least 3 Character' ]
        },
        plate:{
            type: String,
            requied: true,
            minlength: [6, 'Color must be at least 6 Character' ]
        },
        capacity:{
            type: Number,
            requied: true,
            minlength: [1, 'Capacity must be at least 1'],
        },
        vehicleType:{
            type: String,
            requied: true,
            enum: ['car','auto','bike']
        }
    },
    location:{
        lat:{
            type: Number
        },
        lng:{
            type: Number
        }
    }
})

captainSchema.methods.comparePassword = async function (password){
   try{
        const isMatch = await bcrypt.compare(password,this.password);
        return isMatch;
   }
   catch(err){
        console.log(err);
        throw err;
   }
}

captainSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password,10); 
}
module.exports = mongoose.model('Captain', captainSchema);