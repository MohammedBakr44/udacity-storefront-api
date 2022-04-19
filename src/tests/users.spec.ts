import { User, Users } from '../models/users';
import { app } from '../server';
import supertest from 'supertest';

const request = supertest(app);
const store = new Users();
const user: User = {
    firstName: 'Finn',
    lastName: 'The Human',
    password: 'Marci12'
}
let token: string;
const userSpec = () => {
    describe('User model', () => {
        it('has index mathod', () => {
            expect(store.index).toBeDefined();
        })
        it('has add method', () => {
            expect(store.addUser).toBeDefined();
        })

        it('has get method', () => {
            expect(store.getUser).toBeDefined();
        })

        it('has update method', () => {
            expect(store.updateUser).toBeDefined();
        })

        it('has delete method', () => {
            expect(store.deleteUser).toBeDefined();
        })
        it('has auth method', () => {
            expect(store.auth).toBeDefined();
        })
    })

    describe('Users CRUD', () => {
        beforeAll(async () => {
            const testUser = await store.addUser(user);
            if (testUser.id) user.id = testUser.id;
            const authUser = await request.post('/api/users/auth').send({
                id: testUser.id,
                password: user.password
            });
            token = authUser.body.data.token;
            console.log(token);
            console.log(user);
        })
        it('index all users', async () => {
            const response = await request.get('/api/users')
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toEqual(200);
        });
        it('index all users without a token', async () => {
            const response = await request.get('/api/users')
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer `);
            expect(response.status).toEqual(401);
        });
        it('creates a user', async () => {
            const response = await request.post('/api/users')
                .send({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    password: user.password
                })
            expect(response.status).toEqual(200);
        });
        it('updates a user', async () => {
            const response = await request.put('/api/users')
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    ...user,
                    password: 'princessbubblegum12'
                });
            expect(response.status).toEqual(200);

        });
        it('updates a user without token', async () => {
            const response = await request.put('/api/users')
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer `)
                .send({
                    ...user,
                    password: 'princessbubblegum12'
                });
            expect(response.status).toEqual(401);
        });
        it('updates a user with wrong id', async () => {
            const response = await request.put('/api/users')
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    firstName: 'Fake',
                    lastName: 'User',
                    password: 'password',
                    id: '1'
                });
            expect(response.status).toEqual(400);
        });
        it('gets a user', async () => {
            const response = await request.get(`/api/users/${user.id}`)
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toEqual(200);
        });
        it('gets a user without token', async () => {
            const response = await request.get(`/api/users/${user.id}`)
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer `);
            expect(response.status).toEqual(401);
        });
        it('gets a user with wrong id', async () => {
            const response = await request.get(`/api/users/1`)
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toEqual(400);
        })
        it('authorize a user', async () => {
            const response = await request.post('/api/users/auth')
                .send({
                    id: user.id,
                    password: user.password
                });
            expect(response.status).toEqual(200);
        });

        it('authorize a user with wrong id', async () => {
            const response = await request.post('/api/users/auth')
                .send({
                    id: '1',
                    password: user.password
                });
            expect(response.status).toEqual(401);
        });
        it('deletes a user', async () => {
            const response = await request.delete(`/api/users/${user.id}`)
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toEqual(200);
        });
        it('deletes a user without token', async () => {
            const response = await request.delete(`/api/users/${user.id}`)
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer `);
            expect(response.status).toEqual(401);
        });

        it('deletes a user with wrong id', async () => {
            const response = await request.delete(`/api/users/1`)
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toEqual(401);
        });

    })
}

export default userSpec;