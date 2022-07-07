import express from 'express';
import superAdminsController from '../controllers/super-admins';
import validations from '../validations/super-admins';

const router = express.Router();

router.get('/', superAdminsController.getFilter);
router.get('/:id', superAdminsController.getById);
router.post('/', validations.superAdmin, superAdminsController.post);
router.put('/:id', validations.superAdmin, superAdminsController.put);
router.delete('/:id', superAdminsController.deleteById);

export default router;
