const mongoose = require('mongoose')

const weatherSchema = mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    temp_min: {
        type: Number,
        required: true
    },
    temp_max: {
        type: Number,
        required: true
    },
    temp_avg: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    updated_at: {
        type: String,
        required: true
    }
})

const Weather = mongoose.model('log', weatherSchema)

module.exports = Weather