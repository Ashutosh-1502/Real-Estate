import bcrypt from 'bcrypt';
import User from '../models/userModels.js';
import { setUser, getUser, cookieOption } from '../services/auth.js';
import ExpressError from '../utilities/expressError.js';

const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password)
        return next(new ExpressError("Please fill all the required field" , 404 ));
    const hashedPassword = bcrypt.hashSync(password, 12);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    const token = setUser(newUser);
    newUser.password = null;
    res.cookie('token', token, cookieOption).status(201).json({
        success: true,
        message: 'Register successful',
        newUser,
        token
    })
}

const signin = async (req, res, next) => {
    const { username , password } = req.body;
    const existingUser = await User.findOne({ username });
    if (!existingUser || !bcrypt.compareSync(password, existingUser.password))
        return next(new ExpressError("Username or password is incorrect" , 401));

    const token = setUser(existingUser);
    existingUser.password = null;
    res.cookie('token', token, cookieOption).status(201).json({
        success: true,
        message: 'Login Successful',
        existingUser,
        token
    })
}

export { signUp, signin };