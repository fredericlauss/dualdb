import express from 'express';
import { getNotes, getNotebyId, createNote, deleteById, updateNote } from '../controllers/Note.controller';
import { verifyToken } from '../middleware/verificationToken.middleware';

const router = express.Router();

router.get('/', verifyToken, getNotes);
router.get('/:id', verifyToken, getNotebyId);
router.post('/', verifyToken, createNote);
router.delete('/:id', verifyToken, deleteById);
router.put('/:id', verifyToken, updateNote);

export default router;