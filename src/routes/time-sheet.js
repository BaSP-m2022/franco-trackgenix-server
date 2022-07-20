import express from 'express';
import timeSheetsController from '../controllers/time-sheets';
import authMiddleware from '../middlewares/authMiddleware';
import validations from '../validations/time-sheets';

const router = express.Router();

router.get('/', authMiddleware.Employee, timeSheetsController.getAll);
router.get('/:id', authMiddleware.Employee, timeSheetsController.getById);
router.delete('/:id', authMiddleware.Employee, authMiddleware.Admin, timeSheetsController.deleteById);
router.post('/', authMiddleware.Employee, validations.timeSheet, timeSheetsController.createTimesheet);
router.put('/:id', authMiddleware.Employee, validations.timeSheet, timeSheetsController.editTimesheet);

export default router;
