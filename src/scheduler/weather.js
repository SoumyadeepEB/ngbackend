const axios = require('axios')
const moment = require('moment')
const Weather = require('../models/weatherModel')

exports.getWeatherData = () => {
    axios.get(`${process.env.API_URL}?q=Kolkata&appid=${process.env.API_KEY}`)
    .then((res) => {
        const response = res.data
        Weather.findOne({date:moment().format('YYYY-MM-DD')}, (err, data) => {
            if(!err){
                const temp_min = (parseFloat(response.main.temp_min)-273)
                const temp_max = (parseFloat(response.main.temp_max)-273)
                const temp_avg = ((temp_min+temp_max)/2)
                if(data){
                    data.temp_min = temp_min
                    data.temp_max = temp_max
                    data.temp_avg = temp_avg
                    data.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')

                    data.save((err, data) => {
                        if(!err){
                            let json = JSON.stringify({
                                status: 'success',
                                message: 'Data updated successfully'
                            })
                            console.log(json)
                        }
                    })
                }else{
                    let weather = new Weather({
                        city: response.name,
                        temp_min: temp_min,
                        temp_max: temp_max,
                        temp_avg: temp_avg,
                        date: moment().format('YYYY-MM-DD'),
                        updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
                    })
                    weather.save((err, data) => {
                        if(!err){
                            let json = JSON.stringify({
                                status: 'success',
                                message: 'Data inserted successfully'
                            })
                            console.log(json)
                        }
                    })
                }
            }
        })
    })
    .catch((err) => {
        let json = JSON.stringify({
            status: 'error',
            message: 'Something went wrong'
        })
        console.log(json)
    })
}