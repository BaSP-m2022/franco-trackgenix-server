import express from 'express';
import timeSheetsController from '../controllers/time-sheets';
import timeSheetsValidation from '../validations/time-sheets';

const router = express.Router();

router.post('/', timeSheetsValidation.validations, timeSheetsController.createTimesheet);
router.put('/:id', timeSheetsValidation.validations, timeSheetsController.editTimesheet);

export default router;
