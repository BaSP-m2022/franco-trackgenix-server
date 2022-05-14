import express from 'express';
import projectsController from '../controllers/projects';
// import projectValidation from '../validations/project';

const router = express.Router();

router.get('/', projectsController);

router.get('/:id', projectsController);

router.post('/', projectsController);

router.put('/:id', projectsController);

router.delete('/:id', projectsController);

export default router;
