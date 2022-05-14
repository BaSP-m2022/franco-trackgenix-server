import express from 'express';
import employeeController from '../controllers/employees';
// import employeesValidation from '../validations/employees';

const router = express.Router();

router.get('/', employeeController.getFilter);
router.get('/:id', employeeController.getById);
router.post('/', employeeController.post);
router.put('/:id', employeeController.put);
router.delete('/:id', employeeController.Delete);

export default router;
