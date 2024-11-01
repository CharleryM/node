import express from "express";
import * as fileController from '../controllers/FileController'
import multer from 'multer';

const fileRouter = express.Router()

// route.post('/upload', multer.upload.single(),);

fileRouter.get('/download/:id', fileController.downloadFile)
export { fileRouter }