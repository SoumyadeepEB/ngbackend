const express = require('express')
const cron = require('node-cron')
require('dotenv').config()
require('./connection')
const userRoute = require('./routes/user')
const weather = require('./scheduler/weather')

const port = process.env.PORT || 3000
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.append('Access-Control-Allow-Headers', '*');
    next();
})
app.use('/', userRoute) 

cron.schedule('59 23 * * *', () => {
    weather.getWeatherData()
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})