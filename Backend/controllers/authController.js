import bcrypt from 'bcrypt';
import User from '../models/userModels.js';
import {setUser, cookieOption} from '../services/auth.js';
import ExpressError from '../utilities/expressError.js';

const signUp = async (req, res, next) => {
    const {username, email, password, loginWith} = req.body;
    if (!username || !email || !password)
        return next(new ExpressError("Please fill all the required field", 404));
    const hashedPassword = bcrypt.hashSync(password, 12);
    const newUser = new User({username, email, password: hashedPassword, loginWith});
    await newUser.save();
    const token = setUser(newUser);
    newUser.password = null;
    res.cookie('accessToken', token, cookieOption).status(201).json({
        success: true,
        message: 'Register successful',
        user: newUser,
        token
    })
}

const signin = async (req, res, next) => {
    const {username, password} = req.body;
    const existingUser = await User.findOne({username});
    if (!existingUser || !bcrypt.compareSync(password, existingUser.password))
        return next(new ExpressError("Username or password is incorrect", 401));

    const token = setUser(existingUser);
    existingUser.password = null;
    res.cookie('accessToken', token, cookieOption).status(201).json({
        success: true,
        message: 'Login Successful',
        user: existingUser,
        token
    })
}

const googleAuth = async (req, res, next) => {
    const {username, email, photo, loginWith} = req.body;
    const existingUser = await User.findOne({email});
    if (existingUser) {
        const token = setUser(existingUser);
        existingUser.password = null;
        return res.cookie('accessToken', token, cookieOption).status(201).json({
            success: true,
            message: 'Login successful',
            user: existingUser,
            token
        })
    }
    const generatedPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = bcrypt.hashSync(generatedPassword, 12);
    const newGoogleUser = new User({email, username, password: hashedPassword, avatar: photo, loginWith});
    await newGoogleUser.save();
    const token = setUser(newGoogleUser);
    newGoogleUser.password = null;
    res.cookie('accessToken', token, cookieOption).status(201).json({
        success: true,
        message: 'Login Successful',
        user: newGoogleUser,
        token
    })
}

export {signUp, signin, googleAuth};