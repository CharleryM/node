import { stat } from 'fs';
import mysql from 'mysql2/promise';

export class FileModel {

    static async createFile(fileData){
        try {
            const { fileName, size, owner } = fileData;
            return await pool.query('INSERT INTO users (username, email, files) VALUES (?, ?)', [fileName, size, owner]).insertId;
        } catch (error) {
            console.error("Erreur lors de la création de l'utilisateur :", error);
            throw error;
        }
    }

        static async deleteFile(id) {
        try {
            await pool.query('DELETE FROM files WHERE id = ?', [id]);
            return true;
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur :", error);
            throw error;
        }
    }

}