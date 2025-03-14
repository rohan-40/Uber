const userModel = require('../models/userModel');

module.exports.createUser = async ({fullname, email, password}) => {
    if(!fullname || !email || !password){
        throw new Error('All fields are required');
    }
    const newpassword = await userModel.hashPassword(password);
    const user = userModel.create({
        fullname:{
            firstname: fullname.firstname,
            lastname: fullname.lastname
        },
        email,
        password: newpassword
    })

    return user;
}