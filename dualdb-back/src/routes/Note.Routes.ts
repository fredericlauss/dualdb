import express from 'express';
import { getNotes, findOne } from '../controllers/Note.controller';

const router = express.Router();

router.get('/', getNotes);
router.get('/:id', findOne);

export default router;