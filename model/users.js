const mongoose=require('mongoose');

// User data collection
const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    role:{
        type: Number,
        required:true
    }
});

module.exports = mongoose.model('users', UserSchema);
