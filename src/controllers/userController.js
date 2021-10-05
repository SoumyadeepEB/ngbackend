const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Users = require('../models/userModel')

exports.home = (req, res) => {
    res.json({
        project: 'Angular Practice',
        author: 'Soumyadeep Ghosh',
        language: 'Nodejs',
        version: '1.0'
    })
}

exports.register = (req, res) => {
    console.log(req.body)
    if(req.body.password === req.body.cpassword){
        const user = Users({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        user.save((err,data) => {
            if(!err){
                res.status(201).json({
                    status: 'success',
                    message: 'your account has been registered',
                    data: data
                })
            }else{
                res.status(400).json({
                    status: 'error',
                    message: {
                        name: err.errors && err.errors.name && err.errors.name.message ? err.errors.name.message : '', 
                        email: err.errors && err.errors.email && err.errors.email.message ? err.errors.email.message : '' ? err.code == 11000 : 'this email is already taken', 
                        password: err.errors && err.errors.password && err.errors.password.message ? err.errors.password.message : ''
                    }
                })
            }
        })
    }else{
        res.status(400).json({
            status: 'error',
            message: {cpassword: 'password & confirm password should be matched'}
        })
    }
}

exports.login = (req, res) => {
    let email = req.body.email
    let password = req.body.password
    Users.findOne({email: email}, (err, data) => {
        if(!err){
            const payload = {id: data._id, name: data.name}
            const token = jwt.sign(payload, process.env.KEY)
            if(bcrypt.compareSync(password, data.password)){
                res.status(200).json({
                    status: 'success',
                    token: token
                })
            }else{
                res.status(401).json({
                    status: 'error',
                    message: 'invalid email or password'
                })
            }
        }else{
            res.status(401).json({
                status: 'error',
                message: 'invalid email or password'
            })
        }
    })
}

exports.error = (req, res) => {
    res.status(404).json({
        message: 'Content not found'
    })
}