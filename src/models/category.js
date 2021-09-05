const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        required: true,
        trim: true,
        type: String
    },
    parentId: {
        type: String
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Category',categorySchema)