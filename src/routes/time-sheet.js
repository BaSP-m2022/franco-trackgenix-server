import express from 'express';
import timeSheetsController from '../controllers/time-sheets';
import timeSheetsValidation from '../validations/time-sheets';

const router = express.Router();

router.get('/', timeSheetsController.getAll);
router.get('/:id', timeSheetsController.getById);
router.delete('/:id', timeSheetsController.deleteById);
router.post('/', timeSheetsValidation.validations, timeSheetsController.createTimesheet);
router.put('/:id', timeSheetsValidation.validations, timeSheetsController.editTimesheet);

export default router;
