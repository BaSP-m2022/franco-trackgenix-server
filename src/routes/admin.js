import express from 'express';
import adminsValidations from '../validations/adminsValidations';
import adminsControllers from '../controllers/adminsControllers';

const router = express.Router();

router.get('/', adminsControllers.getAllAdmins);
router.get('/:id', adminsControllers.getAdminById);
router.post('/', adminsValidations.createRegisterAdmin, adminsControllers.createAdmin);
router.put('/:id', adminsValidations.editRegisterAdmin, adminsControllers.editAdmin);
router.delete('/:id', adminsControllers.deleteAdmin);

export default router;
