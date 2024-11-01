import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';
// import bcrypt from 'bcrypt';
import { registerUser, loginUser } from './controllers/AuthController';
import {fileRouter} from './routes/FileRoute'
 
const port = 3000;
const server = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(bodyParser.urlencoded({ extended: true }));

server.use(express.static(path.join(__dirname, 'public')));

server.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.use('/file', fileRouter);

server.get('/dashboard', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});



server.post('/register', registerUser);
server.post('/login', loginUser);

// server.post('/api/updoad', upload.single('upload'), uploadFile);
// server.get('/api/download/:id', downloadFile);
// server.get('/api/share/:id', shareFile); 

server.listen(port, () => console.log(`OK sur le port : ${port}`));
