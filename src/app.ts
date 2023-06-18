import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJsDocs = YAML.load("./src/api.yaml");

import MessageResponse from './interfaces/MessageResponse';
import * as middleware from './middleware';
import api from './api';
import todos from './api/todos/todos.routes';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

app.get<{}, MessageResponse>('/', (req, res)=> {
    res.json({
        message: 'Hello TS Express'
    })
});

app.use('/api/v1', api);
app.use('/api/v1/todos', todos);

app.use(middleware.notFound);
app.use(middleware.errorHandler);

export default app;