import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import MessageResponse from './interfaces/MessageResponse';
import * as middleware from './middleware';
import api from './api';
import todos from './api/todos/todos.routes';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res)=> {
    res.json({
        message: 'Hello TS Express'
    })
});

app.use('/api/v1', api);
app.use('/api/v1/todos', todos);

app.use(middleware.NotFound);
app.use(middleware.errorHandler);

export default app;