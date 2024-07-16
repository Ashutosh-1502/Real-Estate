import jwt from 'jsonwebtoken';

const cookieOption = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    sameSite: 'strict',
    path: '/',
}

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        username: user.username,
    }, process.env.JWT_SECRET);
}

export {setUser, cookieOption};