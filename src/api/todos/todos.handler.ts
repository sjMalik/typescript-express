import { Todos, TodoWithId, Todo } from "./todos.model";
import {NextFunction, Request, Response} from 'express';
import { ZodError } from "zod";
import { ParamsWithId } from "../../interfaces/ParamsWithId";
import { ObjectId } from "mongodb";

// Using generics on the Request and Response object
export async function findAll(req: Request, res: Response<TodoWithId[]>, next: NextFunction) {
    try{
        const result = await Todos.find();
        const todos = await result.toArray();
        res.json(todos);
    }catch(err){
        next(err)
    }
};

// Request<Params, Response Body, Request Body>
export async function createOne(req: Request<{}, TodoWithId, Todo>, res: Response<TodoWithId>, next: NextFunction) {
    try{
        const insertResult = await Todos.insertOne(req.body);
        if(!insertResult.acknowledged) throw new Error('Error in inserting');
        res.json({
            _id: insertResult.insertedId,
            ...req.body
        });
    }catch(err){
        if(err instanceof ZodError){
            res.status(422);
        }
        next(err);
    }
}

export async function findOne(req: Request<ParamsWithId, TodoWithId, {}>, res: Response<TodoWithId>, next: NextFunction) {
    try{
        const result = await Todos.findOne({
            _id: new ObjectId(req.params.id)
        });
        if(!result) {
            res.status(404);
            throw new Error(`${req.params.id} not found`)
        }
        res.json(result)
    }catch(err){
        next(err)
    }
}