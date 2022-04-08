import Client from "../database";

export type User = {
    id?: string,
    firstName: string,
    lastName: string,
    password?: string
}

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
                user.password
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
            const result = await connection.query(query, [user.firstName, user.lastName, user.password, user.id]);
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
            throw new Error(`Coult not delete product, ${(error as Error).message}`)
        }
    }

}