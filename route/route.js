const express = require('express');
const router = express.Router();
const multer = require('multer');

const loginController = require('../controller/logincontroller');
const { supervisor, savedata } = require('../controller/supervisorcontroller');
const { userdata } = require('../controller/usercredential');
const { getUserData } = require('../controller/userlogindata');
const { updateUser } = require('../controller/updateuser');
const { deleteUser } = require('../controller/deleteuser');
const { updateLocation, getEmployeeLocation } = require('../controller/locationcontroller');
const { getAllMessages } = require('../controller/messagecontroller');

// NEW: video controller
const videoController = require('../controller/videocontroller');


// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });


// Existing Routes
router.post('/register', loginController.register);
router.post('/login', loginController.login); // Generic login for both roles
router.post('/supervisorlogin', loginController.login); // Keep for backward compatibility
router.post('/userlogin', userdata); // Keep existing user login
router.post('/supervisor', upload.single('image'), supervisor);
router.put('/change-role', loginController.changeRole); // NEW: Change user role
router.post('/message', savedata);
router.get('/getusers', getUserData);
router.put('/updateuser/:id', updateUser);
router.delete('/deleteuser/:id', deleteUser);

// NEW: Routes for supervisor dashboard
router.get('/users', getUserData); // Get all registered users
router.get('/messages', getAllMessages); // Get all user messages

// NEW: Employee routes for map
router.get('/employees', getUserData); // Reuse getusers for employees
router.post('/location', updateLocation); // Proper location update endpoint
router.get('/location/:employeeId', getEmployeeLocation); // Get specific employee location


// 🔥 NEW ROUTES FOR EMPLOYEE VIDEO TRACKING

// upload employee activity video
router.post('/upload-video', upload.single('video'), videoController.uploadVideo);

// get all videos
router.get('/videos', videoController.getAllVideos);


module.exports = router;
