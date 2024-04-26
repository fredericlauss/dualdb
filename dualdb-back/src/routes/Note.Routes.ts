import express from 'express';
import { getNotes, getNotebyId, createNote } from '../controllers/Note.controller';
import { verifyToken } from '../middleware/verificationToken.middleware';

const router = express.Router();

router.get('/', verifyToken, getNotes);
router.get('/:id', verifyToken, getNotebyId);
router.post('/', verifyToken, createNote);

export default router;