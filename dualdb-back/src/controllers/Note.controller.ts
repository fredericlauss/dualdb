import { Request, Response } from 'express';
import { Note } from '../models/Note.model';
import { UserAccount } from '../models/User.model';
import { orm } from "../../index";
import jwt from 'jsonwebtoken';

export async function getNotes(req: Request, res: Response) {
  const mikro = await orm;
  const em = mikro.em.fork();

  if (!req.cookies || !req.cookies.jwt) {
    return res.status(401).json({ message: "Token non fourni" });
  }

  const token = req.cookies.jwt;
  let userId: number;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as { userId: number };
    userId = decodedToken.userId;
    const noteRepository = em.getRepository(Note);

    const notes = await noteRepository.find({ UserAccount : userId });
    return res.json(notes);
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token invalide" });
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
    return res.json(note);
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la récupération notes" });
  }
}

export async function createNote(req: Request, res: Response) {
  const { title, content } = req.body;
  
  if (!req.cookies || !req.cookies.jwt) {
    return res.status(401).json({ message: "Token non fourni" });
  }

  if (!title || !content) {
    return res.status(400).json({message: "Le champs titre et contenu sont obligatoire"})
  }

  const token = req.cookies.jwt;
  let userId: number;
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as { userId: number };
    userId = decodedToken.userId;
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token invalide" });
  }


  const mikro = await orm;
  const em = mikro.em.fork();
  try {
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
    return res.status(201).json(note);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la création de la note" });
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
    return res.status(200).json({ message: "Note supprimée avec succès" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la suppression de la note" });
  }
}

export async function updateNote(req: Request, res: Response) {

    const id = req.params.id;
    const { title, content } = req.body;
    const mikro = await orm;
    const em = mikro.em.fork();
  
    try {
      const noteRepository = em.getRepository(Note);
      
      const note = await noteRepository.findOne({ id: parseInt(id) });
  
      if (!note) {
        return res.status(404).json({ message: "Note non trouvée" });
      }
  
      await em.removeAndFlush(note);
      return res.status(200).json({ message: "Note supprimée avec succès" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur lors de la suppression de la note" });
    }
  }