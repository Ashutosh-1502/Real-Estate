import express from 'express';
import {signUp , signin , googleAuth} from '../controllers/authController.js'
import catchAsync from '../utilities/catchAsync.js';
const router = express.Router();

router.post('/sign-up', catchAsync(signUp));

router.post('/sign-in' , catchAsync(signin));

router.post('/google' , catchAsync(googleAuth));

export default router;