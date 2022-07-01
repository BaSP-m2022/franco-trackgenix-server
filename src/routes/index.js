import express from 'express';
import superAdminRouter from './super-admin';
import projectRouter from './project';
import employeeRouter from './employee';
import adminRouter from './admin';
import timesheetRouter from './time-sheet';
import authRouter from './auth';

const router = express.Router();

router.use('/projects', projectRouter);
router.use('/admins', adminRouter);
router.use('/super-admins', superAdminRouter);
router.use('/time-sheets', timesheetRouter);
router.use('/employees', employeeRouter);
router.use('/auth', authRouter);

export default router;
