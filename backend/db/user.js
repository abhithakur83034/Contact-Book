const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:String,
    mobile :Number,
    email:String,
    website:String,
    gender:String,
    isActive :{
        type:Boolean,
        default:false
       
    },
    date:String

})

module.exports = mongoose.model('user',userSchema)