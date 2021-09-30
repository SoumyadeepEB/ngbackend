const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        minLength: [3, 'name must be at least 3 characters'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minLength: [8, 'password must be at least 8 characters'],
        trim: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now
    }
})

userSchema.pre('save', async function(next){
    this.password = await bcrypt.hashSync(this.password, 10)
    next()
})

const Users = mongoose.model('user', userSchema)

module.exports = Users