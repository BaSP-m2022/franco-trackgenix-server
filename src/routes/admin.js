import express from 'express';
import adminsController from '../controllers/admins';
import validations from '../validations/admins';

const router = express.Router();

router.get('/', adminsController.getAllAdmins);
router.get('/:id', adminsController.getAdminById);
router.post('/', validations.admin, adminsController.createAdmin);
router.put('/:id', validations.admin, adminsController.editAdmin);
router.delete('/:id', adminsController.deleteAdmin);

export default router;
