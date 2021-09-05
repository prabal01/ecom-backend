const { check, validationResult } = require('express-validator')
exports.validateSignupRequest = [check('firstName').notEmpty().withMessage('First name can not be empty'), check('lastName').notEmpty().withMessage('Last Name can not be empty'), check('email').isEmail().withMessage('Please Enter a valid email'), check('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 char long')]
exports.validateSigninRequest = [check('email').isEmail().withMessage('Please Enter a valid email'), check('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 char long')]
exports.isReqValidated = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.array().length>0) {
        console.log('hete',typeof(errors.array()))
        res.status(400).json({ error: errors.array()[0].msg })
    } else {
        next()
    }
}