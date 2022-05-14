import express from 'express';
import employeeRoutes from './employeeRoutes';

const router = express.Router();

router
  .use('/employees', employeeRoutes);

export default router;
