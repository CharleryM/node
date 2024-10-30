import mysql from 'mysql2/promise';

export class UserModel {

    static async createUser(userData) {
        try {
            const { username, email, files } = userData;
            return await pool.query('INSERT INTO users (username, email, files) VALUES (?, ?)', [username, email, files]).insertId;
        } catch (error) {
            console.error("Erreur lors de la création de l'utilisateur :", error);
            throw error;
        }
    }
    
    static async getUserById(id) {
        try {
            return( await pool.query('SELECT * FROM users WHERE id = ?', [id])[0]); 
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur :", error);
            throw error;
        }
    }

    static async updateUser(id, userData) {
        try {
            const { username, email, files } = userData;
            await pool.query('UPDATE users SET username = ?, email = ?, files = ? WHERE id = ?', [username, email, files, id]);
            return true;
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
            throw error;
        }
    }

    static async deleteUser(id) {
        try {
            await pool.query('DELETE FROM users WHERE id = ?', [id]);
            return true;
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur :", error);
            throw error;
        }
    }
}
