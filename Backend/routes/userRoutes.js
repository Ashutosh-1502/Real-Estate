import express from 'express';
import {verifyToken} from "../middleware.js";
import {updateUser} from "../controllers/userControllers.js";
import catchAsync from "../utilities/catchAsync.js";

const router = express.Router();

router.patch('/updateProfile/:id', verifyToken, catchAsync(updateUser));

export default router;