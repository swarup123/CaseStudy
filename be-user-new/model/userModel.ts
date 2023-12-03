import mongoose, {Schema, Model} from "mongoose";
import { UserModel } from "./userModel.type";

let validateEmail = function (email: string) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new Schema<UserModel>({
  firstName: { type: String, required: true, minlength: [1, 'First name Should be more one character'] , maxlength:[100, 'First name should be within 100 characters']},
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: [validateEmail, "Please fill a valid email address"],
  },
  lastName: { type: String,required: true, minlength: [1, 'Last name Should be more one character'] , maxlength:[100, 'Last name should be within 100 characters'] },
  createdAt: Date
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;