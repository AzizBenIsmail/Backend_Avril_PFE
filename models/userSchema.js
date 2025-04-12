const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  nom: String,
  prenom: {type :String,minLength :3 , maxLength : 15},
  email: { type: String, require: true, unique: true },
  password: {type :String, require:true , minLength : 8 },
  role: {type : String , enum : ['admin','client']},
  age: Number,
  user_image:String,
  //hetho teba3 x
  isActive : Boolean
  //hetho teba3 Y
},{timestamps:true});

userSchema.pre("save",async function(next){
    try {
        const salt = await bcrypt.genSalt()
        const User = this
        User.password = await bcrypt.hash(User.password,salt)
        isActive = false
        next()
    } catch (error) {
        next(error)
    }
})

const User = mongoose.model("User", userSchema);
module.exports = User;

//  match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
