import { Todos, TodoWithId } from "./todos.model";
import {Request, Response} from 'express';

// Using generics on the Request and Response object
export async function findAll(req: Request, res: Response<TodoWithId[]>) {
    const result = await Todos.find();
    const todos = await result.toArray();
    res.json(todos);
}