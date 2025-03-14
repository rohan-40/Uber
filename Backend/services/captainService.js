const captainModel = require('../models/captainModel')

module.exports.createCaptain = async ({fullname, email, password, vehicle}) => {
    if(!fullname || !email || !password || !vehicle){
        throw new Error('All fields are required');
    }

    const newpassword = await captainModel.hashPassword(password);
    const captain = captainModel.create({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname,
        },
        email,
        password: newpassword,
        vehicle:{
            color: vehicle.color,
            plate : vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType,
        }
    })

    return captain;
}