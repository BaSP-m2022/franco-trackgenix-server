import express from 'express';
import superAdminsController from '../controllers/super-admins';
import validations from '../validations/super-admins';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', authMiddleware.SuperAdmin, superAdminsController.getFilter);
router.get('/:id', authMiddleware.SuperAdmin, superAdminsController.getById);
router.post('/', authMiddleware.SuperAdmin, validations.superAdmin, superAdminsController.post);
router.put('/:id', authMiddleware.SuperAdmin, validations.superAdmin, superAdminsController.put);
router.delete('/:id', authMiddleware.SuperAdmin, superAdminsController.deleteById);

export default router;
