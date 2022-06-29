import express from 'express';
import projectsController from '../controllers/projects';
import projectValidation from '../validations/projects';

const router = express.Router();

router.get('/', projectsController.filter);

router.get('/employee/:id', projectsController.getByEmployeeId);

router.get('/:id', projectsController.getById);

router.post('/', projectValidation.projectValidation, projectsController.create);

router.put('/:id', projectValidation.projectValidation, projectsController.update);

router.delete('/:id', projectsController.deleteById);

export default router;
