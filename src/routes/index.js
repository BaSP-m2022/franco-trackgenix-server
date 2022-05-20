import express from 'express';
import superAdminRouter from './super-admin';
import projectRouter from './project';
import employeeRouter from './employee';
import taskRouter from './task';
import adminRouter from './admin';
import timesheetRouter from './time-sheet';

const router = express.Router();

router.use('/tasks', taskRouter);
router.use('/projects', projectRouter);
router.use('/admins', adminRouter);
router.use('/super-admins', superAdminRouter);
router.use('/time-sheets', timesheetRouter);
router.use('/employees', employeeRouter);

export default router;
