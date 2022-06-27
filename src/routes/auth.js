import express from 'express';
import controller from '../controllers/auth';
import validations from '../validations/auth';

const router = express.Router();

const { register } = controller;

router.post('/register', validations.required, register);

export default router;
