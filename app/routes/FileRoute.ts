import express from "express";
import * as fileController from '../controllers/FileController'
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        const filename = req.params.filename || `${Date.now()}-${file.originalname}`;
        cb(null, filename); 
    },
});

const upload = multer({ storage });

const fileRouter = express.Router()

fileRouter.post('/upload/:filename', upload.single('test'), fileController.uploadFile);

fileRouter.get('/download/:id', fileController.downloadFile)
export { fileRouter }