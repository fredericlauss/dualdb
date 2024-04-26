import { Request, Response } from 'express';
import { Note } from '../models/Note.model';
import { UserAccount } from '../models/User.model';
import { orm } from "../../index";
import jwt, { JwtPayload } from 'jsonwebtoken';

export async function getNotes(req: Request, res: Response) {
  const mikro = await orm;
  const em = mikro.em.fork();
  try {
    const noteRepository = em.getRepository(Note);
    const notes = noteRepository.findAll();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des notes' });
  }
}

export async function getNotebyId(req: Request, res: Response) {
  const mikro = await orm;
  const em = mikro.em.fork();
  try {
    const noteRepository = em.getRepository(Note);
    const { id } = req.params;
    const note = await noteRepository.findOne({ id: parseInt(id) });
    console.log(note)
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération note " });
  }
}

export async function createNote(req: Request, res: Response) {
  const { title, content } = req.body;
  
  if (!req.cookies || !req.cookies.jwt) {
    return res.status(401).json({ message: "Token non fourni" });
  }

  const token = req.cookies.jwt;
  let userId: number;
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as { userId: number };
    userId = decodedToken.userId;
    console.log(userId);
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token invalide" });
  }


  const mikro = await orm;
  const em = mikro.em.fork();
  try {
    const noteRepository = em.getRepository(Note);
    const userRepository = em.getRepository(UserAccount);

    const user = await userRepository.findOne({ id: userId });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const note = new Note();
    note.title = title;
    note.content = content;
    note.UserAccount = user;

    await em.persistAndFlush(note);
    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de la note" });
  }
}

export async function deleteById(req: Request, res: Response) {

  const id = req.params.id;

  const mikro = await orm;
  const em = mikro.em.fork();

  try {
    const noteRepository = em.getRepository(Note);
    
    const note = await noteRepository.findOne({ id: parseInt(id) });

    if (!note) {
      return res.status(404).json({ message: "Note non trouvée" });
    }

    await em.removeAndFlush(note);
    res.status(200).json({ message: "Note supprimée avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la suppression de la note" });
  }
}