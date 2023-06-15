import * as z from 'zod';
import {db} from '../../db';

import {WithId} from 'mongodb';

const Todo = z.object({
    content: z.string().min(1),
    done: z.boolean().default(false)
});

// Basic interface to describe this type
// Export Todo Type
export type Todo = z.infer<typeof Todo>;

// db.collection supports generics so we cab pass in the type. We specifically typed this in Todo
// It will return typed information that have like these propertys(content, done ) and when insert into DB it check we specify those properties
// Export collection type
export const Todos = db.collection<Todo>('todos');
// WithId helper add the `_id` which comes from DB while we query the DB
export type TodoWithId = WithId<Todo>