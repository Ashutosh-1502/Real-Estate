import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
}
    , { timestamps: true }  //timestamp add two important extra info like time of creation and time of updation
)

userSchema.plugin(mongooseUniqueValidator , {message : "Excepted {PATH} needs to be unique"})

const User = mongoose.model('User' , userSchema);
export default User;