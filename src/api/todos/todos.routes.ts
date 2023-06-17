import {NextFunction, Router, Request, Response} from 'express';
import * as TodoHandler from './todos.handler';
import { Todo } from './todos.model';
import {validateRequest} from '../../middleware';
import { ParamsWithId } from '../../interfaces/ParamsWithId';


const router = Router();

router.get('/', TodoHandler.findAll);
router.post('/', validateRequest({
    body: Todo
}), TodoHandler.createOne);
router.get('/:id', validateRequest({
    params: ParamsWithId
}), TodoHandler.findOne);
router.put('/:id', validateRequest({
    params: ParamsWithId,
    body: Todo
}), TodoHandler.updateOne);
router.delete('/:id', validateRequest({
    params: ParamsWithId
}), TodoHandler.deleteOne)

export default router;