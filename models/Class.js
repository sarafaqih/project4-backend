const {Schema, model} = require("mongoose")
const mongoose = require("mongoose");


const ClassSchema = new Schema({
    teachingApplication: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teaching",
        required:true,
    }, 
    teacher: {
        type: String,
        required:true,
    }, 
    subject: {
        type:String,
        required:true,
      },
      days:{
        type: [String], 
        required:true,
      },
      time:{
        type:String,
        required:true,
      },
      classMode: {
        type: String,
        enum: ["online", "in-person", "hybrid"],
        required:true,
      },
      venue:{
        type: String,
      },
      numberOfStudents:{
        type: Number, 
        required:true,
      },
      ageOFStudents:{
        type:String
      },
      studentsName: {
          type: String
      },
      createdAt: {
          type: Date,
          default: Date.now,
          required: true,
        },
})

const Class = model("Class",ClassSchema)

module.exports = Class