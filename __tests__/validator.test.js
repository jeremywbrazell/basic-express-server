'use strict';

const { server } = require('../src/server');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('Validator Test', () => {
    it('500 error', async () => {
        return mockRequest.get('/person').then(data => {
            expect(data.status).toBe(500);
        })
    });
    it('should validate a GET: /person route', async () => {
        const response = await mockRequest.get('/person?name=Jeremy');
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('Jeremy');
    })
})
