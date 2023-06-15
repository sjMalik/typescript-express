import {Router} from 'express';
import { findAll } from './todos.handler';


const router = Router();

router.get('/', findAll);

// router.get<{}, Todo[]>('/', (req, res)=> {
//     res.json([
//         {
//             content: 'Learn Typescript',
//             done: false
//         }
//     ])
// })

export default router;