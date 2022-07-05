import express from 'express';
import adminsController from '../controllers/admins';
import validations from '../validations/admins';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', adminsController.getAllAdmins);
router.get('/:id', adminsController.getAdminById);
router.post('/', authMiddleware.authMiddlewareSuperAdmin, validations.admin, adminsController.createAdmin);
router.put('/:id', authMiddleware.authMiddlewareAdmin, validations.admin, adminsController.editAdmin);
router.delete('/:id', authMiddleware.authMiddlewareSuperAdmin, adminsController.deleteAdmin);

export default router;
