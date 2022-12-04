import mongoose, { Model } from 'mongoose';

import { ObjectId } from 'mongoose';

//create a type user
type LeaveType = LeaveModel & mongoose.Document;

export interface LeaveModel {
  reason: {
    type: string;
    required: true;
  };
  startDate: {
    type: Date;
    required: true;
  };
  endDate: {
    type: Date;
  };
  leaveType: {
    type: String;
    enum: {
      values: ['sick', 'personal', 'other'];
      message: 'Select Type of leave.';
    };
    required: true;
  };
  status: {
    type: String;
    enum: ['pending', 'rejected', 'accepted'];
    default: 'pending';
  };
  remarks: {
    type: String;
  };

  user: {
    type: ObjectId;
    ref: 'User';
    required: true;
  };
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

//generics
const Leave: Model<LeaveType> = mongoose.model<LeaveType>('Leave', LeaveSchema);

export default Leave;
