import { User, Users } from '../../models/users';
import { app } from '../../server';
import supertest from 'supertest';

const request = supertest(app);
const store = new Users();
const user: User = {
    firstname: 'Finn',
    lastname: 'The Human',
    password: 'Marci12'
}
let token: string;
const userSpecModel = () => {
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
        })
        it('index all users', async () => {
            const result = await store.index();
            expect(result).toBeTruthy();
        })
        it('adds a user', async () => {
            const result = await store.addUser(user);
            expect({ firstName: result.firstname, lastName: result.lastname }).toEqual({
                firstName: user.firstname,
                lastName: user.lastname
            })
        })
        it('gets a user', async () => {
            const result = await store.getUser(user.id as string);
            expect({ firstname: result.firstname, lastname: result.lastname }).toEqual({
                firstname: user.firstname,
                lastname: user.lastname
            })
        })
        it('updates a user', async () => {
            const result = await store.updateUser({ ...user, firstname: 'BMO', lastname: 'MOE' });
            expect({ firstname: result.firstname, lastname: result.lastname }).toEqual({ firstname: 'BMO', lastname: 'MOE' });
        })
        it('authorize a user', async () => {
            const result = await store.auth(user.id as string, user.password as string);
            expect(result?.id).toEqual(user.id);
        })
        it('deletes a user', async () => {
            const result = await store.deleteUser(user.id as string);
            expect(result.id).toEqual(user.id);
        })
    })
}

export default userSpecModel;

