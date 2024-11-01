import mysql, { Pool } from 'mysql2/promise';

export class FileModel {
    pool: Pool

    constructor(pool: Pool) {
        this.pool = pool
    }

    async createFile(fileData){
        try {
            const { fileName, size, ownerId } = fileData;
            return await this.pool.query('INSERT INTO users (username, email, files) VALUES (?, ?)', [fileName, size, ownerId]).insertId;
        } catch (error) {
            console.error("Erreur lors de la création de l'utilisateur :", error);
            throw error;
        }
    }

    async getFileById(id) {
        try {
            const [rows] = await this.pool.query('SELECT * FROM files WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            console.error("Erreur lors de la récupération du fichier :", error);
            throw error;
        }
    }

    async deleteFile(id) {
        try {
            await this.pool.query('DELETE FROM files WHERE id = ?', [id]);
            return true;
        } catch (error) {
            console.error("Erreur lors de la suppression du fichier :", error);
            throw error;
        }
    }

}