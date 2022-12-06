"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLeave = void 0;
const lodash_1 = __importDefault(require("lodash"));
const LeaveModel_1 = __importDefault(require("../model/LeaveModel"));
const UserModel_1 = __importDefault(require("../model/UserModel"));
//add new leave request
const requestLeave = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const leaveData = lodash_1.default.pick(req.body, [
        'reason',
        'startDate',
        'endDate',
        'leaveType',
        'status',
        'remarks',
        'user',
    ]);
    let startDate;
    let endDate;
    if (leaveData.startDate) {
        startDate = new Date(leaveData.startDate);
        if (leaveData.endDate) {
            endDate = new Date(leaveData.endDate);
            console.log('startDate: ', startDate);
            console.log('endDate: ', endDate);
            console.log(startDate >= endDate);
            if (startDate >= endDate) {
                return res.status(400).json({
                    status: false,
                    message: 'Start Date should be at least on same or prior date than end date',
                });
            }
        }
        if (startDate <= new Date()) {
            return res.status(400).json({
                status: false,
                msg: "Start Date should not be less than today's date",
            });
        }
    }
    else {
        return res
            .status(400)
            .json({ status: false, msg: 'Start date is required :(' });
    }
    if (req.body.leaveType) {
        const checkLeave = yield LeaveModel_1.default.findOne({
            leaveType: req.body.leaveType,
            startDate,
            user: req.body.user,
        });
        if (checkLeave)
            return res.status(400).json({
                status: false,
                msg: 'You have already applied for same leave on same date',
            });
    }
    //set user property
    leaveData.user = req.body.user;
    //create new leave entry
    const leave = yield LeaveModel_1.default.create(leaveData);
    const userLeave = yield UserModel_1.default.findById(req.body.user);
    //return success
    return res.json({
        status: true,
        msg: `${userLeave === null || userLeave === void 0 ? void 0 : userLeave.name} is on ${leaveData.leaveType} leave from ${leaveData.startDate} to ${leaveData.endDate}`,
        leave,
    });
});
exports.requestLeave = requestLeave;
