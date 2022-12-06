import { Types } from 'mongoose';
import { UserType } from '../model/UserModel';

export {};

declare global {
  namespace Express {
    interface Request {
      user: Types.ObjectId;
    }
  }
}
