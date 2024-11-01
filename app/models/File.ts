import mysql, { Pool } from 'mysql2/promise';

export class FileModel {
    pool: Pool

    constructor(pool: Pool) {
        this.pool = pool
    }

    async createFile(fileData){
            const { fileName, size, ownerId } = fileData;
            const [result] = await this.pool.query('INSERT INTO users (username, email, files) VALUES (?, ?)', [fileName, size, ownerId])
            return result.insertId;
    }

    async getFileById(id) {
            const [rows] = await this.pool.query('SELECT * FROM files WHERE id = ?', [id]);
            return rows[0];
    }

    async deleteFile(id) {
            await this.pool.query('DELETE FROM files WHERE id = ?', [id]);
            return true;
    }

}