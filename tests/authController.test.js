const request = require('supertest');
const app = require('../server');
const User = require('../models/User');

describe('Auth Controller', () =>
{
    afterAll(async () =>
    {
        await User.deleteMany({});
    });

    describe('POST /api/auth/register', () =>
    {
        it('should register a user successfully', async () =>
        {
            const response = await request(app).post('/api/auth/register').send({
                username: 'testuser',
                password: 'testpassword',
            });
            expect(response.status).toBe(201);
            expect(response.body.message).toBe('User registered successfully');
        });

        it('should return an error if username is missing', async () =>
        {
            const response = await request(app).post('/api/auth/register').send({
                password: 'testpassword',
            });
            expect(response.status).toBe(400);
        });
    });

    describe('POST /api/auth/login', () =>
    {
        beforeAll(async () =>
        {
            await new User({ username: 'testuser', password: 'testpassword' }).save();
        });

        it('should login a user successfully', async () =>
        {
            const response = await request(app).post('/api/auth/login').send({
                username: 'testuser',
                password: 'testpassword',
            });
            expect(response.status).toBe(200);
            expect(response.body.token).toBeDefined();
        });

        it('should return an error for invalid credentials', async () =>
        {
            const response = await request(app).post('/api/auth/login').send({
                username: 'testuser',
                password: 'wrongpassword',
            });
            expect(response.status).toBe(401);
        });
    });
});
