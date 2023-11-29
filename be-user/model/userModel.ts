import mongoose, {Schema, Model} from "mongoose";
import { UserModel } from "./userModel.type";

let validateEmail = function (email: string) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new Schema<UserModel>({
  firstName: { type: String, required: true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: [validateEmail, "Please fill a valid email address"],
  },
  lastName: { type: String },
  createdAt: Date
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;