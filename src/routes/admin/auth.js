const express = require('express');
const { signup, signIn } = require('../../controller/admin/auth');
const { isReqValidated, validateSignupRequest, validateSigninRequest } = require('../../validator/auth');

const router = express.Router();


router.post('/admin/signin',validateSigninRequest,isReqValidated, (req,res)=>{
    signIn(req,res)
})

router.post('/admin/signup',validateSignupRequest,isReqValidated,(req,res)=>{
signup(req,res)
})


module.exports = router;