import express from "express";
import { FileModel } from "../models/File";

const FileRouter = express.Router()

const file = FileModel
FileRouter
    .route('/dashboard')
