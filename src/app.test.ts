import request from 'supertest';

import app from './app';

beforeEach(()=> {
    jest.useFakeTimers()
})

describe('app', ()=> {
    it('Response with 404', (done)=> {
        request(app)
            .get('/what-is-this')
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(404, done)
    })
});

describe('GET /', ()=> {
    it('respond with json message', (done)=> {
        request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200, {
                message: 'Hello TS Express'
            }, done)
    })
})