const express = require('express');
const userController =  require('../controllers/userController');

const router = express.Router();

// Add users to the db
router.post('/create-user', userController.createUser);

// Get details of all the users
router.get('/get-all-users', userController.getAllUsers);

// Get details of user
router.get('/get-user-details', userController.getUserDetails);

// User delete
router.delete('/delete-user', userController.deleteUser);

// User login
router.post('/login', userController.userLogin);



module.exports = router;
