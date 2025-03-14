const express = require('express');
const router = express.Router();
const captainControllers = require('../controllers/captainControllers'); 
const {body} = require('express-validator');
const  jwt = require('../middleware/jwt');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min : 6}).withMessage('Password must be at least 6 character long'),
    body('fullname.firstname').isLength({min : 4}).withMessage('Firstname must be at least 4character long'),
    body('vehicle.color').isLength({min:3}).withMessage('color must be at least 3 character long'),
    body('vehicle.plate').isLength({min:7}).withMessage('Plate must be at least 7 character long'),
    body('vehicle.capacity').isLength({min:1}).withMessage('Capacity must be at least 1')
],
    captainControllers.registerCaptain
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min : 6}).withMessage('Password must be at least 6 character long')
],
    captainControllers.loginCaptain
)

router.get('/profile',jwt.authCaptain,
    captainControllers.captainProfile
)

router.get('/logout',jwt.authCaptain,
    captainControllers.logoutCaptain
)
module.exports = router;