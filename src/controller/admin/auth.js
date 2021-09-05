const User = require('../../models/user')
const jwt = require('jsonwebtoken')

exports.signup = (req,res) =>{
    User.findOne({email:req.body.email})
.exec((error,user)=>{
    if(user) return res.status(400).json({
        message:'Admin already registered'
    })
    
    const {
        firstName,
        lastName,
        email,
        password,
    } = req.body
    const _user = new User({
        firstName,
        lastName,
        email,
        password,
        username:Math.random().toString(),
        role:'admin'
    })

    _user.save((err,data)=>{
        console.log(req.body, err)
        if(err) return res.status(400).status({
            message:'Something went wrong'
        })
        if(data) return res.status(200).json({
            message:'Admin created successfully'
        })
    })
})
}

exports.signIn = (req,res)=>{
    const {email}= req.body
    User.findOne({email}).exec((err, user)=>{
        if (err) console.log('ERROR: ', err)
        else if(user){
if(user.authenticate(req.body.password) && user.role === 'admin'){
    const token = jwt.sign({_id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn: '1h'})
    const {_id,email,firstName, lastName, role, fullName} = user
    res.status(200).json({
        token,
        user:{_id,email,firstName, lastName, role, fullName}
    })
} else if(user.authenticate(req.body.password) && user.role !=='admin'){
    console.log(user.role)
    res.status(400).json({
        message:'User account with this email does not exist'
    })
}else{
    res.status(400).json({
        message:'Invalid username or password'
    })
}
} else if(user === null && err === null){
    res.status(400).json({
        message:'Admin with this email does not exist'
    })
}
})
}

