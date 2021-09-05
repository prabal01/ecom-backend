const jwt = require('jsonwebtoken')
exports.requireSignIn=(req,res,next)=>{
    const token = req.headers.authorization? req.headers.authorization.split(" ")[1] : ''
    console.log('token',token)
    try {
        user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user;
        next()
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: 'Invalid Token!!'
        })
    }
}

exports.adminMiddleware = (req,res,next) => {
    const {user} = req;
    console.log(user.role)
    if(user.role !== 'admin'){
        res.status(400).json({message:'Access Denied!'})
    }
    else next()
}