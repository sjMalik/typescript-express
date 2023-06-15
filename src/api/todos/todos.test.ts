import request from 'supertest';

import app from '../../app';

describe('Todo routes', ()=> {
    it('Get /api/v1/todos', async ()=> {
        request(app)
            .get('/api/v1/todos')
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200)
            .then(response=> {
                expect(response.body).toHaveProperty('length');
                expect(response.body.length).toBe(0);
                // expect(response.body[0]).toHaveProperty('content');
                // expect(response.body[0]).toHaveProperty('done');
            })
    })
})