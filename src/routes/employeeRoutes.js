import express from 'express';
import employeeController from '../controllers/employees';
// import employeesValidation from '../validations/employees';

const router = express.Router();

router.get('/', employeeController);
router.get('/:id', employeeController);
router.post('/', employeeController);
router.put('/:id', employeeController);
router.delete('/:id', employeeController);

export default router;
