import express from 'express';
import employeeController from '../controllers/employees';
// import employeesValidation from '../validations/employees';

const router = express.Router();

router.get('/', employeeController.routerGetFilter);
router.get('/:id', employeeController.routerGetById);
router.post('/', employeeController.routerPost);
router.put('/:id', employeeController.routerPut);
router.delete('/:id', employeeController.routerDelete);

export default router;
