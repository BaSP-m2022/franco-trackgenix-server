import express from 'express';
import authController from '../controllers/auth';
import validations from '../validations/auth';

const router = express.Router();

router.post('/signup', validations.signUp, authController.signUp);

export default router;
