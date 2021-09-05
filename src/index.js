const express = require('express')
const env = require('dotenv')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')
const categoryRouter = require('./routes/category')
env.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// CONNECTING DATABASE
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.rwspc.mongodb.net/${process.env.MONGO_DB_DATABASE}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('Database Connected');
})

app.use('/api',userRoutes)
app.use('/api',adminRoutes)
app.use('/api',categoryRouter)

app.listen(process.env.PORT,()=>{
    console.log('server is running on PORT', process.env.PORT)
})
