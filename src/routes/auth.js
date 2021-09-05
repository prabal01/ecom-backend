const express = require('express');
const { requireSignIn } = require('../common-middleware');
const { signup, signIn } = require('../controller/auth');
const { isReqValidated, validateSigninRequest, validateSignupRequest } = require('../validator/auth')
const router = express.Router();


router.post('/signin',validateSigninRequest,isReqValidated,(req, res)=> {
    signIn(req, res)
})

router.post('/signup',validateSignupRequest,isReqValidated, (req, res) => {
    signup(req, res)
})

router.post('/profile', requireSignIn, (req, res) => {
    res.status(200).json({
        user: req.user
    })
})

module.exports = router;