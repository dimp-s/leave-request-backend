"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const LeaveSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });
//generics
const Leave = mongoose_1.default.model('Leave', LeaveSchema);
exports.default = Leave;
