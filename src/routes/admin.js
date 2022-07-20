import express from 'express';
import adminsController from '../controllers/admins';
import validations from '../validations/admins';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', authMiddleware.Admin, adminsController.getAllAdmins);
router.get('/:id', authMiddleware.Admin, adminsController.getAdminById);
router.post('/', authMiddleware.SuperAdmin, validations.admin, adminsController.createAdmin);
router.put('/:id', authMiddleware.SuperAdmin, validations.admin, adminsController.editAdmin);
router.delete('/:id', authMiddleware.SuperAdmin, adminsController.deleteAdmin);

export default router;
