import express from 'express';
import projectsController from '../controllers/projects';
import projectValidation from '../validations/projects';

const router = express.Router();

router.get('/', projectsController.filter);

router.get('/:id', projectsController.getById);

router.post('/', projectValidation.validationCreateProject, projectsController.create);

router.put('/:id', projectValidation.projectValidation, projectsController.update);

router.delete('/:id', projectsController.deleteById);

export default router;
