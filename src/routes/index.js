import express from 'express';
// import projectRouter from './project';
// import superAdminRouter from './super-admin';
import employeeRouter from './employee';
// import taskRouter from './task';
// import adminRouter from './admin';
import timesheetRouter from './time-sheet';

const router = express.Router();

// router.use('/projects', projectRouter);
// router.use('/tasks', taskRouter);
// router.use('/admins', adminRouter);
// router.use('/super-admins', superAdminRouter);
router.use('/timesheets', timesheetRouter);
router.use('/employees', employeeRouter);

export default router;
