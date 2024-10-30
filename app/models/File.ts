import mysql, { Pool } from 'mysql2/promise';

export class FileModel {
    pool: Pool

    constructor(pool: Pool) {
        this.pool = pool
    }

    async createFile(fileData){
        try {
            const { fileName, size, owner } = fileData;
            return await this.pool.query('INSERT INTO users (username, email, files) VALUES (?, ?)', [fileName, size, owner]).insertId;
        } catch (error) {
            console.error("Erreur lors de la création de l'utilisateur :", error);
            throw error;
        }
    }

    async deleteFile(id) {
        try {
            await this.pool.query('DELETE FROM files WHERE id = ?', [id]);
            return true;
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur :", error);
            throw error;
        }
    }

}