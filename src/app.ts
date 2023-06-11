import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import MessageResponse from './interfaces/MessageResponse';

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

export default app;