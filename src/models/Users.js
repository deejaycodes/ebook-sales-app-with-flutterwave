const mongoose = require('mongoose')
const validator = require('validator')



const userSchema = mongoose.Schema({
    name:{
        type: String,


    },
    email: {
      type: String,
    
        },
    
    phone:{
        type: Number

    },

})


const User = mongoose.model('User', userSchema)
module.exports = User