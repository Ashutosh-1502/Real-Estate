import bcrypt from 'bcrypt';
import User from '../models/userModels.js';

const signUp = async (req, res, next) => {
    const {username , email , password} = req.body;
    const hashedPassword = bcrypt.hashSync(password , 12);
    const newUser = new User({username , email , password : hashedPassword});
    await newUser.save();
    res.status(201).json({
        success : true,
        message : 'Login successful',
        newUser
    })
}

export default signUp;