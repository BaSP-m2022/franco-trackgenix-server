import express from 'express';
import employeeController from '../controllers/employees';
import employeesValidations from '../validations/employees';

const router = express.Router();

router.get('/', employeeController.getFilter);
router.get('/:id', employeeController.getById);
// router.post('/', employeeController.post);
router.put('/:id', employeesValidations.validateEdit, employeeController.put);
// router.delete('/:id', employeeController.deleteById);

export default router;
