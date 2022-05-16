import express from 'express';
import {
  getAllAdmins, postCreateAdmin, getAdminById,
  putEditAdmin, deleteAdmin, getAdmin,
} from '../controllers/admins';
// import employeesValidation from '../validations/employees';

const router = express.Router();

// localhost:3000/admins/
router.get('/', getAdmin);
router.get('/', getAllAdmins);
// localhost:3000/admins/1
router.get('/:id', getAdminById);
router.post('/', postCreateAdmin);
router.put('/:id', putEditAdmin);
router.delete('/:id', deleteAdmin);

export default router;
