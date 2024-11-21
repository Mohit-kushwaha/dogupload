const request = require('supertest');
const app = require('../server');
const Dog = require('../models/Dog');

describe('Dog Controller', () =>
{
    let dogId;

    beforeAll(async () =>
    {
        const dog = await new Dog({ name: 'Buddy', imageUrl: 'image.jpg' }).save();
        dogId = dog._id;
    });

    afterAll(async () =>
    {
        await Dog.deleteMany({});
    });

    describe('POST /api/dogs', () =>
    {
        it('should create a new dog picture with valid data', async () =>
        {
            const response = await request(app)
                .post('/api/dogs')
                .field('name', 'Charlie')
                .attach('image', './tests/fixtures/sample.jpg');
            expect(response.status).toBe(201);
            expect(response.body.name).toBe('Charlie');
        });

        it('should return an error if name is missing', async () =>
        {
            const response = await request(app).post('/api/dogs').attach('image', './tests/fixtures/sample.jpg');
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Name is required');
        });
    });

    describe('GET /api/dogs', () =>
    {
        it('should fetch all dogs', async () =>
        {
            const response = await request(app).get('/api/dogs');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('GET /api/dogs/:id', () =>
    {
        it('should fetch a dog by valid ID', async () =>
        {
            const response = await request(app).get(`/api/dogs/${ dogId }`);
            expect(response.status).toBe(200);
            expect(response.body.name).toBe('Buddy');
        });

        it('should return 404 if the dog ID does not exist', async () =>
        {
            const response = await request(app).get('/api/dogs/64abcd1234567890abcdef12');
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Dog not found');
        });
    });

    describe('PUT /api/dogs/:id', () =>
    {
        it('should update a dog’s name successfully', async () =>
        {
            const response = await request(app)
                .put(`/api/dogs/${ dogId }`)
                .send({ name: 'Buddy Updated' });
            expect(response.status).toBe(200);
            expect(response.body.name).toBe('Buddy Updated');
        });

        it('should return 404 for an invalid ID', async () =>
        {
            const response = await request(app).put('/api/dogs/64abcd1234567890abcdef12').send({ name: 'Test' });
            expect(response.status).toBe(404);
        });
    });

    describe('DELETE /api/dogs/:id', () =>
    {
        it('should delete a dog by valid ID', async () =>
        {
            const response = await request(app).delete(`/api/dogs/${ dogId }`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Dog deleted successfully');
        });

        it('should return 404 for an invalid ID', async () =>
        {
            const response = await request(app).delete('/api/dogs/64abcd1234567890abcdef12');
            expect(response.status).toBe(404);
        });
    });
});
