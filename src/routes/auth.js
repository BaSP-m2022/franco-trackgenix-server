import express from 'express';
import controller from '../controllers/auth';
import validations from '../validations/auth';

const router = express.Router();

router.post('/register', validations, controller.register);
router.post('/login', validations, controller.login);

export default router;
