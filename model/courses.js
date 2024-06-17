const mongoose=require('mongoose');

// User data collection
const CourseSchema= new mongoose.Schema({
    code:{
        type: String,
        required:true
    },
    name:{
        type: String,
        required:true
    }
});

module.exports = mongoose.model('courses', CourseSchema);
