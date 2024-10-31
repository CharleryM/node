import mysql, { Connection, Pool } from 'mysql2/promise';

export class UserModel {
    pool: Pool

    constructor(pool: Pool) {
        this.pool = pool
    }

    async createUser(userData) {
        try {
            const { username, email, password } = userData;

           const [result] = await this.pool.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password])

            console.log(result)

            return result.insertId;
        } catch (error) {
            console.error("Erreur lors de la création de l'utilisateur :", error);
            throw error;
        }
    }

    async getUserById(id) {
        try {
            return (await this.pool.query('SELECT * FROM users WHERE id = ?', [id])[0]);
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur :", error);
            throw error;
        }
    }

    async updateUser(id, userData) {
        try {
            const { username, email, files } = userData;
            await this.pool.query('UPDATE users SET username = ?, email = ?, files = ? WHERE id = ?', [username, email, files, id]);
            return true;
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            await this.pool.query('DELETE FROM users WHERE id = ?', [id]);
            return true;
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur :", error);
            throw error;
        }
    }
}
