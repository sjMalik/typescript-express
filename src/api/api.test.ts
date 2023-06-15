import request from 'supertest';

import app from '../app';

beforeEach(()=> {
    jest.useFakeTimers()
})

describe('API testing', ()=> {
    it('GET /api/v1/', ()=> {
        request(app)
            .get('/api/v1/')
            .set('Accept', 'Application/json')
            .expect('Content-type', /json/)
            .expect(200, {
                message: '👍'
            })
    })
})