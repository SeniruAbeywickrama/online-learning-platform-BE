const express = require('express');
const courseController =  require('../controllers/courseController');

const router = express.Router();

// Add users to the db
router.post('/create-course', courseController.createCourse);

// Get details of all the users
router.get('/get-all-courses', courseController.getAllCourses);

// Get details of user
router.get('/get-course-details', courseController.getCourseDetails);

// Delete course using id
router.delete('/delete-course', courseController.deleteCourse);

module.exports = router;
