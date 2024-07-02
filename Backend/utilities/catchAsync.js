import ExpressError from "./expressError.js";
const catchAsync = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch(/*(err) => {
            // console.log(err);
            const statusCode = err.status || 500;
            const message = err.message || 'Internal server Error';
            const error = new ExpressError(message, statusCode);
            next(error);
        }*/next);
    }
}

export default catchAsync;
