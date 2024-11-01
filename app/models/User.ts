import { Pool } from 'mysql2/promise';

export class UserModel {
    pool: Pool

    constructor(pool: Pool) {
        this.pool = pool
    }

    async createUser(userData) {
        const { username, email, password } = userData;
        const [result] = await this.pool.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password])

        console.log(result)
        return result.insertId;
    }

    async getUserByEmail(email: string) {
        const [rows] = await this.pool.query('SELECT * FROM users WHERE email = ?', [email]);
        console.log(rows)
        return rows[0];
    }

    async getUserById(id) {
        return (await this.pool.query('SELECT * FROM users WHERE id = ?', [id])[0]);
    }

    async updateUser(id, userData) {
        const { username, email, files } = userData;
        await this.pool.query('UPDATE users SET username = ?, email = ?, files = ? WHERE id = ?', [username, email, files, id]);
        return true;
    }

    async deleteUser(id) {
        await this.pool.query('DELETE FROM users WHERE id = ?', [id]);
        return true;
    }
}
