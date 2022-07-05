import express from 'express';
import employeeController from '../controllers/employees';
import validations from '../validations/employees';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', employeeController.getFilter);
router.get('/:id', employeeController.getById);
router.post('/', authMiddleware.Admin, validations.employee, employeeController.post);
router.put('/:id', authMiddleware.Employee, validations.employee, employeeController.put);
router.delete('/:id', authMiddleware.Admin, employeeController.deleteById);

export default router;
