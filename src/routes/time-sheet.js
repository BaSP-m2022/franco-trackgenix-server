import express from 'express';
import timesheetController from '../controllers/time-sheets';

const router = express.Router();

router.get('/', timesheetController.getAll);
router.get('/:id', timesheetController.getById);
router.delete('/:id', timesheetController.deleteById);

export default router;
