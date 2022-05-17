import express from 'express';
import timeSheetsController from '../controllers/time-sheets';
import timeSheetsValidation from '../validations/time-sheets';

const router = express.Router();

router.post('/', timeSheetsValidation.validateCreate, timeSheetsController.createTimesheet);
router.put('/:id', timeSheetsValidation.validateEdit, timeSheetsController.editTimesheet);

export default router;
