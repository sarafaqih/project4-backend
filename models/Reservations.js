const {Schema, model} = require("mongoose")
const mongoose = require("mongoose");


const ReservationsSchema = new Schema({
    volunteer: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required:true,
    }, 
    parent: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required:true,
    }, 
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Class",
        required:true,
    },
    childs: {
        type: [String]
      },
})

const ParentReservation = model("ParentReservation",ReservationsSchema)

module.exports = ParentReservation