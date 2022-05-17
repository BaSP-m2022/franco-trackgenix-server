import express from 'express';
import projectsController from '../controllers/projects';
// import projectValidation from '../validations/project';

const router = express.Router();

router.route('/')
  .get(projectsController.filter)
  .post(projectsController.create);

router.route('/:id')
  .get(projectsController.getById)
  .put(projectsController.update)
  .delete(projectsController.deleteById);

export default router;
