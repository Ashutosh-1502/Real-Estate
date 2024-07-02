import bcrypt from 'bcrypt';
import User from '../models/userModels.js';
import { setUser, getUser,cookieOption } from '../services/auth.js'

const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 12);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    const token = setUser(newUser);
    res.cookie('token', token , cookieOption).status(201).json({
        success: true,
        message: 'Login successful',
        newUser,
        token
    })
}

export default signUp;