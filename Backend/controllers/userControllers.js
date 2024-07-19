import ExpressError from "../utilities/expressError.js";
import User from "../models/userModels.js";

const updateUser = async (req, res, next) => {
    if (req.user._id !== req.params.id)
        return next(new ExpressError('You can only update your own account'));
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            username: req.body.username,
            email: req.body.email,
            avatar: req.body.avatar,
        }
    }, {new: true})
    console.log(updatedUser);
    updatedUser.password = null;
    res.status(201).json({
        user: updatedUser,
    })
}

export {updateUser};