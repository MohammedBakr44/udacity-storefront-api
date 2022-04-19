import Client from '../database';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const { HASH_PASSWORD, SALT_ROUNDS, TOKEN_SECRET } = process.env;

const hashPassword = (password: string) => {
    const salt = parseInt(SALT_ROUNDS as string);
    return bcrypt.hashSync(`${password}${HASH_PASSWORD}`, salt);
};

export type User = {
    id?: string;
    firstName: string;
    lastName: string;
    password?: string;
};

export class Users {
    async index(): Promise<User[]> {
        try {
            const connection = await Client.connect();
            const query = `SELECT id, firstName, lastName FROM Users`;
            const result = await connection.query(query);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Could not fetch users, ${(error as Error).message}`);
        }
    }

    async addUser(user: User): Promise<User> {
        try {
            const connection = await Client.connect();
            const query = `INSERT INTO Users 
            (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING id, firstName, lastName`;
            const result = await connection.query(query, [
                user.firstName,
                user.lastName,
                hashPassword(user.password as string)
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            console.log(err);
            throw new Error(`Unable to create user`);
        }
    }

    async getUser(id: string): Promise<User> {
        try {
            const connection = await Client.connect();
            const query = 'SELECT id, firstName, lastName FROM Users WHERE id=($1)';
            const result = await connection.query(query, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not find user ${(error as Error).message}`);
        }
    }

    async updateUser(user: User): Promise<User> {
        try {
            const connection = await Client.connect();
            const query = `UPDATE Users 
                           SET firstName=$1, lastName=$2, password=$3 where id=$4 RETURNING id, firstName, lastName`;
            const result = await connection.query(query, [
                user.firstName,
                user.lastName,
                hashPassword(user.password as string),
                user.id
            ]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not update user, ${(error as Error).message}`);
        }
    }

    async deleteUser(id: string): Promise<User> {
        try {
            const connection = await Client.connect();
            const query = `DELETE FROM Users where id=($1) RETURNING id, firstName, lastName`;
            const result = await connection.query(query, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not delete user, ${(error as Error).message}`);
        }
    }

    // authenticate user
    async auth(id: string, password: string): Promise<User | null> {
        try {
            const connection = await Client.connect();
            const query = `SELECT password FROM Users WHERE id=($1)`;
            const result = await connection.query(query, [id]);
            if (result.rows.length) {
                const { password: hashPassword } = result.rows[0];
                const isPasswordValid = bcrypt.compareSync(`${password}${HASH_PASSWORD}`, hashPassword);
                if (isPasswordValid) {
                    const user = await connection.query(
                        `SELECT id, firstName, lastName from Users where id=($1)`,
                        [id]
                    );
                    return user.rows[0];
                }
            }
            connection.release();
            return null;
        } catch (error) {
            throw new Error(`User is not authenticated, ${(error as Error).message}`);
        }
    }
}
