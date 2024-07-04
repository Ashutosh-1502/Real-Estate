import express from 'express';
import {signUp , signin} from '../controllers/authController.js'
import catchAsync from '../utilities/catchAsync.js';
const router = express.Router();

router.post('/sign-up', catchAsync(signUp));

router.post('/sign-in' , catchAsync(signin));

export default router;