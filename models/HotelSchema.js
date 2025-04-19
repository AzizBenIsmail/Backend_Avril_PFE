const mongoose = require('mongoose')

const hotelSchema = new mongoose.Schema({
    brand : String,
    color: { type: String , required: true , default:"#000000"},
    model: String,
    type: String,
    year: Number,
    owner : {type : mongoose.Schema.Types.ObjectId, ref: 'User',} //one 
})

const Hotel = mongoose.model('Hotel',hotelSchema)

module.exports = Hotel