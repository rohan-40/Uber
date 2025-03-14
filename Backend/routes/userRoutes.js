const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/userControllers');
const user = require('../models/userModel');
const jwt= require('../middleware/jwt');


router.get('/register',(req,res) =>{
    res.send('Welcome to Register Route')
})

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min : 6}).withMessage('Password must be at least 6 character long')
],
    userController.loginUser
)

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min : 6}).withMessage('Password must be at least 6 character long')
],
    userController.registerUser
)

router.get('/profile', jwt.authUser,
    userController.userProfile
)

router.get('/logout',jwt.authUser,
    userController.userLogout
)



module.exports = router;