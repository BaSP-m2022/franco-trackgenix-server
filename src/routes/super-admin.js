import express from 'express';
import superAdminsController from '../controllers/super-admins';
import superAdminsValidation from '../validations/super-admins';

const router = express.Router();

router.get('/', superAdminsController.getFilter);
router.get('/:id', superAdminsController.getById);
router.post('/', superAdminsValidation.creation, superAdminsController.post);
router.put('/:id', superAdminsValidation.edition, superAdminsController.put);
router.delete('/:id', superAdminsController.deleteById);

export default router;
