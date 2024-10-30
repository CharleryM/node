import express from 'express'

const port = 3000

const server = express()

server.listen(port, () => console.log(`Yeah, je tourne sur le port ${port}`))