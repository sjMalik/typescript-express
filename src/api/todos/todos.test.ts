import request from 'supertest';

import app from '../../app';
import { Todo, Todos } from './todos.model';


beforeAll(async ()=> {
    try{
        await Todos.drop();
    }catch(err){}
})

describe('Get /api/v1/todos', ()=> {
    it('Respond with array of todos', async ()=> {
        request(app)
            .get('/api/v1/todos')
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200)
            .then(response=> {
                expect(response.body).toHaveProperty('length');
                expect(response.body.length).toBe(0);
            })
    })
});

let id = '';
describe('POST /api/v1/todos', () => {
    it('responds with an error if the todo is invalid', async () =>
      request(app)
        .post('/api/v1/todos')
        .set('Accept', 'application/json')
        .send({
          content: '',
        })
        .expect('Content-Type', /json/)
        .expect(422)
        .then((response) => {
          expect(response.body).toHaveProperty('message');
        }),
    );

    it('respond with an inserted object', async ()=> 
        request(app)
            .post('/api/v1/todos')
            .set('Accept', 'application/json')
            .send({
                content: 'Learn Typescript',
                done: false
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response=> {
                id = response.body._id;
                expect(response.body).toHaveProperty('_id');
                expect(response.body).toHaveProperty('content');
                expect(response.body.content).toBe('Learn Typescript');
                expect(response.body).toHaveProperty('done')
            })
    );
})


describe('GET /api/v1/todos/:id', ()=> {
    it('respond with single todo', async ()=> 
        request(app)
            .get(`/api/v1/todos/${id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response=> {
                expect(response.body).toHaveProperty('_id');
                expect(response.body._id).toBe(id);
                expect(response.body).toHaveProperty('content');
                expect(response.body).toHaveProperty('done');
            })

    );

    it('respond with invalid objectid error', (done)=> {
        request(app)
            .get('/api/v1/todos/ababsbsbsb')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422, done);
    });

    it('respond with not found error', (done)=> {
        request(app)
            .get('/api/v1/todos/6306d061477bdb46f9c57fa4')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    })
})