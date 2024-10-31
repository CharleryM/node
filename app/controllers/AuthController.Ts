import { Request, Response } from 'express';
import mysql from 'mysql2/promise';
import { UserModel } from '../models/User';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "express"
});
const userModel = new UserModel(pool);

export async function registerUser(req: Request, res: Response) {
  const { username, email, password } = req.body;

  try {
    const userId = await userModel.createUser({ username, email, password });
    res.redirect('/dashboard');
    console.log(`Inscription réussie ! Utilisateur ID : ${userId} ${username} ${password} ${email}`);
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).send("Erreur lors de l'inscription");
  }
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await userModel.getUserByEmail(email);

    if (user && user.password === password) {
      res.redirect('/dashboard');
      console.log(`Connexion réussie ! Bienvenue, ${user.username}`);
    } else {
      res.status(401).send("Email ou mot de passe incorrect");
    }
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).send("Erreur lors de la connexion");
  }
}
