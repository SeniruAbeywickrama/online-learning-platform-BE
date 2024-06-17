const mongoose=require('mongoose');

// User data collection
const EnrollmentSchema= new mongoose.Schema({
    userId:{
        type: String,
        required:true
    },
    courseId:{
        type: String,
        required:true
    }
});

module.exports = mongoose.model('enrollments', EnrollmentSchema);
