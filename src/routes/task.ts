import { Router, Request, Response } from 'express';
import { Task } from '../models/task';
import { body } from 'express-validator';

const router = Router();
let tasks: Task[] = [];
const taskValidationRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('completed').isBoolean().withMessage('Completed must be a boolean'),
  ];
  
router.post('/', taskValidationRules,  (req: Request, res: Response) => {
    const task: Task = {
        id: tasks.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false,
    };

    tasks.push(task);
    res.status(201).json(task);
});

router.get('/', (req: Request, res: Response) => {
    res.json(tasks);
});

router.get('/:id', (req: Request, res: Response) => {
    const task = tasks.find((t) => t.id === parseInt(req.params.id));

    if (!task) {
        res.status(404).send('Task not found');
    } else {
        res.json(task);
    }
});

export default router;