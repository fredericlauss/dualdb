import express from 'express';
import { getNotes, getNotebyId, createNote, deleteById, updateNote } from '../controllers/Note.controller';
import { verifyToken } from '../middleware/verificationToken.middleware';

const router = express.Router();

router.get('/', verifyToken, getNotes);
router.get('/:id', verifyToken, getNotebyId);
router.post('/', verifyToken, createNote);
router.delete('/:id', verifyToken, deleteById);
router.put('/:id', verifyToken, updateNote);

/**
 * @openapi
 * /notes/:
 *   get:
 *     description: Récupère toutes les notes d'un utilisateur.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Succès. Retourne toutes les notes de l'utilisateur.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       401:
 *         description: Token non fourni ou invalide.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Erreur lors de la récupération des notes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         userId:
 *           type: integer
 *       required:
 *         - id
 *         - title
 *         - content
 *         - userId
 */

export default router;