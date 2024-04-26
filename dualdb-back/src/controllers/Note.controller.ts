import { Request, Response } from 'express';
import { Note } from '../models/Note.model';
import { orm } from "../../index";

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

export async function findOne(req: Request, res: Response) {
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


