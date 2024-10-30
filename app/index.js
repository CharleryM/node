import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const port = 3000;
const server = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(express.static(path.join(__dirname, 'app')));

server.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

server.listen(port, () => console.log(`Yeah, je tourne sur le port ${port}`));
