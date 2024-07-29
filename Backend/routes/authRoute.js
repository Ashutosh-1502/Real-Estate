import express from 'express';
import {signUp, signIn, googleAuth, signOut} from '../controllers/authController.js'
import catchAsync from '../utilities/catchAsync.js';

const router = express.Router();

router.post('/sign-up', catchAsync(signUp));

router.post('/sign-in', catchAsync(signIn));

router.post('/google', catchAsync(googleAuth));

router.get('/signOut', catchAsync(signOut));

export default router;