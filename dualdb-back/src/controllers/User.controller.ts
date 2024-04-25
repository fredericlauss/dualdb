import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.model';
import { orm } from "../../index";

export async function register(req: Request, res: Response) {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const mikro = await orm;
  const em = mikro.em.fork();

  try {
    const userRepository = em.getRepository(User);
    const user = userRepository.create({ username, password: hashedPassword });
    await em.persistAndFlush(user); 
    res.status(201).json({ message: 'Utilisateur inscrit avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'inscription de l\'utilisateur' });
  }
}


export async function login(req: Request, res: Response) {
    const { username, password } = req.body;
  
    const mikro = await orm;
    const em = mikro.em.fork();
  
    try {
      const userRepository = em.getRepository(User);
      const user = await userRepository.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Mot de passe incorrect' });
      }
  
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
  
      res.status(200).json({ message: 'Authentification réussie' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de l\'authentification de l\'utilisateur' });
    }
  }