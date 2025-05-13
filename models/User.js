const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    username: {
        type: String,
        required:[true,"Email is Required"],
        unique:true,
        lowercase:true,
        trim:true
    },
    hashedPassword:{
        type:String,
        required:[true,"Password is Required"]
    },
    role:{
        type:String, 
        enum:["admin", "parent", "volunteer"],
        required: true
    }, 
    childs: {
        type: [String]
      }, 
      gender: {
        type:String,
        enum:["female", "male"]
    },
    ContactNo: {
        type: Number,
        min:10000000,
        max: 99999999,
        required: true,
      },
      firstName:{
        type:String
      }, 
      lastName:{
        type:String
      }, 
      experience:{
        type: String
      }
  



})

const User = model("User",userSchema)

module.exports = User