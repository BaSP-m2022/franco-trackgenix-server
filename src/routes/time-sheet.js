import express from 'express';
import timeSheetsController from '../controllers/time-sheets';

const router = express.Router();

router.post('/', timeSheetsController.createTimesheet);
router.put('/:id', timeSheetsController.editTimesheet);

export default router;
