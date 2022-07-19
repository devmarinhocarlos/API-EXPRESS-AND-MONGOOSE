const mongoose = require("mongoose");

//Entities
const ClientSchema = new mongoose.Schema({

    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
    mail:{
        type: String,
        required: true,
    },
    phone:{
        type: Number,
        required: true,
    },
   isActive:{
        type: Boolean,
        required: true,
   }
});

const Client = mongoose.model("Client", ClientSchema);

module.exports = { Client };