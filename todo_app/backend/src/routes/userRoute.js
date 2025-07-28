import express from 'express';
import { registerUser, loginUser,getUserProfile } from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/auth.js';
import { upload } from '../middlewares/upload.js';


const router = express.Router();

router.post('/register', upload.single('foto'), registerUser);
router.post('/login', loginUser);
router.get('/', authenticateToken, getUserProfile);


export default router;
