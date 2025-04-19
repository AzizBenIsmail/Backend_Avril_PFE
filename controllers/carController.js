const CarModel = require("../models/carSchema")
const UserModel = require("../models/userSchema")

module.exports.getAllCars = async (req,res)=>{
    try {
        const listCars = await CarModel.find()

        res.status(200).json({listCars})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports.getCarById = async (req,res)=>{
    try {
        const {id} = req.params

        const car = await CarModel.findById(id)

        res.status(200).json({car})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports.addCar = async (req,res)=>{
    try {
        const {brand,color,matricul}=req.body()

        const addedCar = new CarModel({
            brand,color,matricul
        })

        addedCar.save()

        res.status(200).json(addedCar)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports.deleteCar = async (req,res) => {
    try {
        const {id} = req.params

        await CarModel.findByIdAndDelete(id)

        await UserModel.updateMany({},{$pull : {cars : car.id}})

        res.status(200).json("car deleted")
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
}

module.exports.UpdateCarById = async (req,res)=>{
    try {
        const {id} = req.params
        const {brand,color,matricul}=req.body()

        const car = await CarModel.findById(id)
        if(!car){
            throw new Error("car not found");            
        }

        const updatedCar = await CarModel.findByIdAndUpdate(id,{$set : {brand,color,matricul}})
        res.status(200).json({updatedCar})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
//----------------
module.exports.getCountCars = async (req,res)=>{
    try {
        const listCars = await CarModel.countDocuments()

        res.status(200).json({listCars})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports.getAllCars = async (req,res)=>{
    try {

        const listCars = await CarModel.find().sort({age:-1})

        res.status(200).json({listCars})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports.addCarWithOwner = async (req,res)=>{
    try {
        const {brand,color,matricul,owner}=req.body()

        const addedCar = new CarModel({
            brand,color,matricul,owner
        })

        addedCar.save()

        await UserModel.findByIdAndUpdate(owner,{
            $push:{cars :addedCar._id }
        })

        res.status(200).json(addedCar)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}