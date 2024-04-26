import express from 'express';
import { getNotes, getNotebyId, createNote, deleteById } from '../controllers/Note.controller';
import { verifyToken } from '../middleware/verificationToken.middleware';

const router = express.Router();

router.get('/', verifyToken, getNotes);
router.get('/:id', verifyToken, getNotebyId);
router.post('/', verifyToken, createNote);
router.delete('/:id', verifyToken, deleteById);

export default router;