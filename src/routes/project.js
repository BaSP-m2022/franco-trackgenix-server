import express from 'express';
import projectsController from '../controllers/projects';
import validations from '../validations/projects';

const router = express.Router();

router.get('/', projectsController.filter);
router.get('/:id', projectsController.getById);
router.post('/', validations.project, projectsController.create);
router.put('/:id', validations.project, projectsController.update);
router.delete('/:id', projectsController.deleteById);

export default router;
