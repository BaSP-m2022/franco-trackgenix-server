import express from 'express';
import projectRoutes from './project';

const router = express.Router();

router.use('/projects', projectRoutes);

export default router;
