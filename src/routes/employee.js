import express from 'express';
import employeeController from '../controllers/employees';
import validations from '../validations/employees';
import authMiddleware from '../middlewares/authMiddleware';
import auth from '../controllers/auth';

const router = express.Router();

router.get('/', employeeController.getFilter);
router.get('/:id', employeeController.getById);
router.post('/', authMiddleware.Admin, validations.employee, auth.signUp);
router.put('/:id', authMiddleware.Employee, validations.employee, employeeController.put);
router.delete('/:id', authMiddleware.Admin, employeeController.deleteById);

export default router;
