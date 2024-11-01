import { Request, Response, RequestHandler } from 'express';
import mysql from 'mysql2/promise'
import { FileModel } from '../models/File'
import path from 'path';
import {pool} from '../configs/config'

const fileModel = new FileModel(pool)

export const uploadFile: RequestHandler = async (req: Request, res: Response) => {
  const { fileName, size, userId } = req.body;
  try {
    const fileId = await fileModel.createFile({ fileName, size, userId });
    console.log( req.body)
    res.status(201).json({ message: 'Fichier uploadé avec succès', fileId });
  } catch (error) {
    console.error("Erreur lors de l'upload du fichier :", error);
    res.status(500).send("Erreur lors de l'upload du fichier");
  }
}

export const downloadFile: RequestHandler = async (req: Request, res: Response) =>{
  const { id } = req.params;
  try {
    const file = await fileModel.getFileById(id);
    if (!file) {
      return res.status(404).send("Fichier non trouvé");
    }

    const filePath = path.join(__dirname, '../uploads', file.fileName);
    res.download(filePath, file.fileName);
  } catch (error) {
    console.error("Erreur lors du téléchargement du fichier :", error);
    res.status(500).send("Erreur lors du téléchargement du fichier");
  }
}

export async function shareFile(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const file = await fileModel.getFileById(id);

    if (!file) {
      return res.status(404).send("Fichier non trouvé");
    }
    const shareLink = `${req.protocol}://${req.get('host')}/download/${id}`;
    res.json({ message: 'Lien de partage créé', link: shareLink });
  } catch (error) {
    console.error("Erreur lors de la création du lien de partage :", error);
    res.status(500).send("Erreur lors de la création du lien de partage");
  }
}