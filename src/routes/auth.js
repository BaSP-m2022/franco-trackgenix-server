import express from 'express';
import signUp from '../controllers/auth';
import validations from '../validations/auth';

const router = express.Router();

router.post('/signup', validations.signup, signUp);

export default router;
