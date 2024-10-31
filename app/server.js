import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import { UserModel } from './models/User';
import { FileModel } from './models/File';

const port = 3000;
const server = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "express"
})

const myFileModel = new UserModel(pool)
myFileModel.createUser({ username: "klgs", email: "toto", password: "klgfdslg" }).then(data => console.log(data))

server.use(bodyParser.urlencoded({ extended: true }));

server.use(express.static(path.join(__dirname, 'public')));

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

server.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    connection.release();

    res.send('Inscription réussie !');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de l\'inscription');
  }
});

server.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const connection = await pool.getConnection();
    const rows = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    connection.release();

    if (rows.length === 0) {
      return res.status(401).send('Utilisateur non trouvé');
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send('Mot de passe incorrect');
    }

    res.send('Connexion réussie !');
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la connexion");
  }
});

server.listen(port, () => console.log(`Yeah, je tourne sur le port ${port}`));
