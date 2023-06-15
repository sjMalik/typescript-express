## Packages
* [cors](https://github.com/sjMalik/interview-question-answers/blob/main/NodeJS.md#using-cors-in-middleware)
* morgan - Logger
* helmet - Helmet helps secure Express apps by setting HTTP response headers.
* dotenv - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
* @types/node, @types/express etc are the packages contains the type defintion of node, express etc.
* zod - Zod is a TypeScript-first schema declaration and validation library. I'm using the term "schema" to broadly refer to any data type, from a simple string to a complex nested object.

Zod is designed to be as developer-friendly as possible. The goal is to eliminate duplicative type declarations. With Zod, you declare a validator once and Zod will automatically infer the static TypeScript type. It's easy to compose simpler types into complex data structures.

* jest - Its using for tests. It will find any file that has the name test in it so we dont need any separate folder to keep the test files. In terms of setup its important to have the express app defined and exported from its own file. Dont mix with index beacuse we need it for testing. So it should be standalone

* We need to close the DB connection after all the testing

* Difference between jest and supertest
    - jest is the test runner and expecteation libraries e.g. beforeAll, describe, it, expect
    - we wrap our express app in request that supertest
        ```
        import request from 'supertest';

        request(app)
            .get('/api/v1/')
            .set('Accept', 'Application/json')
        ```
    - we can combine these two by chaining
        ```
        request(app)
            .get('/api/v1/')
            .set('Accept', 'Application/json')
            .expect('Content-type', /json/)
            .expect(200, {
                message: '👍'
            })
        ```


## Steps
1. init node project
    - `npm init -y`
2. install typescript, ts-node, nodemon as dev dependency
    - `npm i typescript ts-node nodemon -D`
3. initiate typescript project
    - `npx tsc --init`