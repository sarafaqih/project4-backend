const {Schema, model} = require("mongoose")
const mongoose = require("mongoose");


const TeachingApplicationSchema = new Schema({
    volunteer: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required:true,
    }, 
    subject: {
        type: String,
        required:true,
    }, 
    preferredDays: {
        type: [String], 
        required:true,
      },
      time:{
        type:String,
        required:true,
      },
      startTime:{
        type:String,
        required:true
      },
      endTime:{
        type:String,
        required:true
      },
      // duration:{
      //   type:String
      // },
      preferredMode: {
        type: String,
        enum: ["online", "in-person", "hybrid"],
      },
      venue:{
        type: String,
      },
      numberOfStudents:{
        type:Number
      },
      ageOFStudents:{
        type:String
      },
      notes: {
          type: String
      },
      createdAt: {
          type: Date,
          default: Date.now,
          required: true,
        },
        approvement:{
          type: String,
          enum: ["Not approved yet", "Approved", "Rejected"] ,
          default: "Not approved yet",
          required: true,
        },
        apprRejBy:{
          type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
        }



})

const Teaching = model("Teaching",TeachingApplicationSchema)

module.exports = Teaching