import jwt from 'jsonwebtoken';
import ExpressError from "./utilities/expressError.js";

function verifyToken(req, res, next) {
    const token = req.cookies?.token;
    console.log(req.cookies.accessToken);
    if (!token)
        return next(new ExpressError('Unauthorized', 401));
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err)
            return next(new ExpressError('Forbidden', 401));
        req.user = user;
        next();
    })
}

export {verifyToken};