import express from 'express';
import taskRouter from './tasks';

const router = express.Router();
router.use('/tasks', taskRouter);

export default router;
