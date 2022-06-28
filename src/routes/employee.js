import express from 'express';
import employeeController from '../controllers/employees';
import employeesValidation from '../validations/employees';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', employeeController.getFilter);
router.get('/:id', authMiddleware, employeeController.getById);
router.post('/', authMiddleware, employeesValidation.postValidation, employeeController.post);
router.put('/:id', authMiddleware, employeesValidation.postValidation, employeeController.put);
router.delete('/:id', authMiddleware, employeeController.deleteById);

export default router;
