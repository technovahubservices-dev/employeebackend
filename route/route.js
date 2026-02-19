const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const loginController = require('../controller/userlogindata');
const supervisor = require('../controller/supervisorcontroller');
const savedata = require('../controller/supervisormessagecontroller');
const userdata = require('../controller/usercredential');
const updateUser = require('../controller/updateuser');
const getMessages = require('../controller/supervisorcontroller');
const personalDriveController = require('../controller/personalDriveController');
const supervisorDriveController = require('../controller/supervisorDriveController');
const cameraAccessController = require('../controller/cameraAccessController');
const { getAllUsers } = require('../controller/authController');
const { deleteMany } = require('../model/loginmodel');

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

// Supervisor Google Drive routes
const supervisorDriveUpload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

router.post('/supervisor/oauth/auth-url', supervisorDriveController.getSupervisorAuthUrl);
router.post('/supervisor/oauth/callback', supervisorDriveController.handleSupervisorCallback);
router.get('/supervisor/oauth/status', supervisorDriveController.checkSupervisorStatus);
router.post('/supervisor/upload-to-drive', supervisorDriveUpload.single('video'), supervisorDriveController.uploadToSupervisorDrive);
router.post('/supervisor/oauth/logout', supervisorDriveController.logoutSupervisor);

// Camera access control routes
router.get('/camera-access', cameraAccessController.getCameraAccess);
router.post('/camera-access', cameraAccessController.setCameraAccess);
router.get('/camera-access/all', cameraAccessController.getAllCameraAccess);

// Existing Routes
router.post('/register', loginController.register);
router.post('/supervisorlogin', loginController.login);
router.post('/supervisor', upload.single('image'), supervisor);
router.post('/userlogin', userdata);
router.post('/message', savedata);
router.get('/getusers', loginController.getUsers);
router.put('/updateuser/:id', updateUser);
router.get('/getmessage',getMessages);
router.delete('/deleteuser/:id',loginController.deleteUser);


router.post('/login',loginController.supervisorlogin);
// 🔥 NEW ROUTES FOR EMPLOYEE VIDEO TRACKING

// upload employee activity video
router.post('/upload-video', upload.single('video'), videoController.uploadVideo);

// get all videos
router.get('/videos', videoController.getAllVideos);


module.exports = router;