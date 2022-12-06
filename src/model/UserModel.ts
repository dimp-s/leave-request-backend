import mongoose, { Model } from 'mongoose';

import { ObjectId } from 'mongoose';

//create a type user
export type UserType = UserModel & mongoose.Document;

export interface UserModel {
  name: string;
  email: string;
  designation: string;
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//generics
const User: Model<UserType> = mongoose.model<UserType>('User', UserSchema);

export default User;
