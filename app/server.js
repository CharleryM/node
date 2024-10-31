import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import { UserModel } from './models/User';
import { FileModel } from './models/File';
import { registerUser, loginUser } from './controllers/AuthController';

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

// const myFileModel = new UserModel(pool)
// myFileModel.createUser({ username: "klgs", email: "toto", password: "klgfdslg" }).then(data => console.log(data))

server.use(bodyParser.urlencoded({ extended: true }));

server.use(express.static(path.join(__dirname, 'public')));

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

server.post('/register', registerUser);
server.post('/login', loginUser);

server.listen(port, () => console.log(`Yeah, je tourne sur le port ${port}`));
