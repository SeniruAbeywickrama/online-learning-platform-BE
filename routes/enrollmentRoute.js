const express = require('express');
const enrollmentController =  require('../controllers/enrollmentController');

const router = express.Router();

// Add users to the db
router.post('/create-enrollment', enrollmentController.createEnrollment);

// Get details of all the users
router.get('/get-all-enrollments', enrollmentController.getAllEnrollments);

// Delete enrollment using id
router.delete('/delete-enrollment', enrollmentController.deleteEnrollments);

module.exports = router;
