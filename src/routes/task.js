import express from 'express';
import taskController from '../controllers/tasks';
import validationTask from '../validations/tasks';

const router = express.Router();
router
  .get('/', taskController.getAllTasks)
  .get('/:id', taskController.getTasksById)
  .post('/', validationTask.validationCreate, taskController.createTask)
  .delete('/:id', taskController.deleteTask)
  .put('/:id', validationTask.validationCreate, taskController.updateTask);

export default router;
