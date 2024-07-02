import express from 'express';
import signUp from '../controllers/authController.js'
import catchAsync from '../utilities/catchAsync.js';
const router = express.Router();

router.post('/sign-up', catchAsync(signUp));

export default router;