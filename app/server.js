import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import { UserModel } from './models/User';
import { FileModel } from './models/File';
import { registerUser, loginUser } from './controllers/AuthController';
import { uploadFile, downloadFile, shareFile } from './controllers/FileController';
 
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

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '/tmp/uploads')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, uniqueSuffix + '-' + file.original )
//   }
// })

// const upload = multer({ storage: storage })


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

// server.post('/api/updoad', upload.single('upload'), uploadFile);
// server.get('/api/download/:id', downloadFile);
// server.get('/api/share/:id', shareFile); 

server.listen(port, () => console.log(`OK sur le port : ${port}`));
