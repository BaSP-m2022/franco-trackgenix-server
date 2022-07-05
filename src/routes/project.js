import express from 'express';
import projectsController from '../controllers/projects';
import authMiddleware from '../middlewares/authMiddleware';
import validations from '../validations/projects';

const router = express.Router();

router.get('/', projectsController.filter);
router.get('/:id', projectsController.getById);
router.post('/', authMiddleware.authMiddlewareAdmin, validations.project, projectsController.create);
router.put('/:id', authMiddleware.authMiddlewareEmployee, validations.project, projectsController.update);
router.delete('/:id', authMiddleware.authMiddlewareAdmin, projectsController.deleteById);

export default router;
