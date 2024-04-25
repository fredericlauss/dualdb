import express from 'express';
import { 
    register, 
    login,
    currentUser
} from '../controllers/User.controller';
import {verifyToken} from "../middleware/verificationToken.middleware";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/current',verifyToken, currentUser);

export default router;