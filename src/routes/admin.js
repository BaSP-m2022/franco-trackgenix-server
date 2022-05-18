import express from 'express';
import admins from '../validations/admins';
import adminsControllers from '../controllers/adminsControllers';

const router = express.Router();

router.get('/', adminsControllers.getAllAdmins);
router.get('/:id', adminsControllers.getAdminById);
router.post('/', admins.createRegisterAdmin, adminsControllers.createAdmin);
router.put('/:id', admins.editRegisterAdmin, adminsControllers.editAdmin);
router.delete('/:id', adminsControllers.deleteAdmin);

export default router;
