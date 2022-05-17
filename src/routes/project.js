import express from 'express';
import projectsController from '../controllers/projects';
import projectValidation from '../validations/project';

const router = express.Router();

router.route('/:id')
  .put(projectValidation, projectsController.update)
  .delete(projectsController.deleteById);

export default router;
