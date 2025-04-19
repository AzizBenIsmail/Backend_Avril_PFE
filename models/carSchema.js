const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    brand :String,
    color : String ,
    matricul: String ,

    //one to 
    owner : {type : mongoose.Schema.Types.ObjectId, ref: 'User',} //one 
},{timestamps:true})

const Car = mongoose.model("Car", carSchema);
module.exports = Car;