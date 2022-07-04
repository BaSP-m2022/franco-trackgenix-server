import express from 'express';
import timeSheetsController from '../controllers/time-sheets';
import validations from '../validations/time-sheets';

const router = express.Router();

router.get('/', timeSheetsController.getAll);
router.get('/:id', timeSheetsController.getById);
router.delete('/:id', timeSheetsController.deleteById);
router.post('/', validations.timeSheet, timeSheetsController.createTimesheet);
router.put('/:id', validations.timeSheet, timeSheetsController.editTimesheet);

export default router;
