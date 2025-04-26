const userModel = require('../models/userSchema')
const bcrypt = require("bcrypt")
module.exports.getAllUsers = async (req,res)=>{
    try {
        
        const userList = await userModel.find()

        res.status(200).json(userList)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.addClient = async (req,res)=>{
    try {
        
        const {nom, prenom,email,password,age}=req.body

        const role = "client"

        const newUser = new userModel({
            nom, prenom,email,password,age,role
        })

        const useradded = await newUser.save()

        res.status(200).json(useradded)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.addAdmin = async (req,res)=>{
    try {
        
        const {email,password}=req.body

        const role = "admin"

        const newUser = new userModel({
            email,password,role
        })

        const useradded = await newUser.save()

        res.status(200).json(useradded)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.deletUserById = async (req,res)=>{
    try {
        const {id}=req.params
        await userModel.findByIdAndDelete(id)

        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.getUserById = async (req,res)=>{
    try {
        const {id}=req.params
        const user = await userModel.findById(id).populate("cars").populate("hotels")

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.getDataUserConnect = async (req,res)=>{
    try {
        const id=req.user._id //user connecte
        const user = await userModel.findById(id).populate("cars").populate("hotels")

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.updatePassword = async (req,res)=>{
    try {
        const {id}=req.params
        const {password}=req.body
        
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password,salt)
        
        const user = await userModel.findByIdAndUpdate(id,{
            $set: {password : hashPassword}
        })

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.updateUser = async (req,res)=>{
    try {
        const {id}=req.params
        const {nom,prenom,age}=req.body
        
        await userModel.findByIdAndUpdate(id,{
            $set: {nom,prenom,age}
        })

        const user = await userModel.findById(id)

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.addUserWithImage = async (req, res) => {
    try {
      const userData = {
        ...req.body,
      };
      if (req.file ) {
        const { filename } = req.file;
        console.log(filename);
        userData.user_image = filename;
      }
      const user = new userModel(userData);
      const addedusers = await user.save();
  
      res.status(200).json({ addedusers });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const jwt = require("jsonwebtoken")

  const createToken=(id) => {
    return jwt.sign({id},'net 9antra25 secret',{expiresIn : '1m'})
  }

  

  module.exports.login = async (req,res)=>{
    try {
        const { email , password} = req.body
        
        const user = await userModel.login(email,password)
        const connecte = true
        await userModel.findByIdAndUpdate(user._id,{
            $set: {connecte}
        })
        const token = createToken(user._id)
        res.cookie('jwt_token',token,{httpOnly:true,maxAge:60*1000})
        res.status(200).json({message :"connected",user : user})
    } catch (error) {
        res.status(500).json({message:error.message} )
    }
  }



  module.exports.logout = async (req,res)=>{
    try {
        const id = req.user_id 
        
        const connecte = false
        await userModel.findByIdAndUpdate(id,{
            $set: {connecte}
        })
        
        res.cookie("jwt_token","",{httpOnly:false,maxAge:1})
        res.status(200).json("User successfully logged out")
    } catch (error) {
        res.status(500).json({message:error.message} )
    }
  }