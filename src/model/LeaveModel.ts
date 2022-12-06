import mongoose, { Model, ObjectId } from 'mongoose';

import { Types } from 'mongoose';
import { UserType } from './UserModel';

//create a type user
export type LeaveType = LeaveModel & mongoose.Document;

export interface LeaveModel {
  reason: string;

  startDate: Date;

  endDate: Date;

  leaveType: string;
  // enum: {
  //   values: ['sick', 'personal', 'other'];
  //   message: 'Select Type of leave.';
  // };

  status: string;
  // enum: ['pending', 'rejected', 'accepted'];

  remarks: String;

  user: Types.ObjectId;
}

const LeaveSchema = new mongoose.Schema(
  {
    reason: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    leaveType: {
      type: String,
      enum: {
        values: ['sick', 'personal', 'other'],
        message: 'Select Type of leave.',
      },
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'rejected', 'accepted'],
      default: 'pending',
    },

    remarks: {
      type: String,
    },

    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

//generics
const Leave: Model<LeaveType> = mongoose.model<LeaveType>('Leave', LeaveSchema);

export default Leave;
