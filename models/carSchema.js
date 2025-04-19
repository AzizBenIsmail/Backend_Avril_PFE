const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    brand :String,
    color : String ,
    matricul: String ,
})

const Car = mongoose.model("Car", carSchema);
module.exports = Car;