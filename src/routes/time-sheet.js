import express from 'express';
import timeSheetsController from '../controllers/time-sheets';

const router = express.Router();

router.post('/', timeSheetsController.createTimesheet);

export default router;
