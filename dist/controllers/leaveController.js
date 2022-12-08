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
exports.updateLeave = exports.getFutureLeaves = exports.getAbsentEmployeesForToday = exports.getLeaveById = exports.getAllLeaves = exports.requestLeave = void 0;
const lodash_1 = __importDefault(require("lodash"));
const moment_1 = __importDefault(require("moment"));
const LeaveModel_1 = __importDefault(require("../model/LeaveModel"));
const UserModel_1 = __importDefault(require("../model/UserModel"));
//add new leave request
const requestLeave = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const leaveData = lodash_1.default.pick(req.body, [
        '_id',
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
        msg: `${userLeave === null || userLeave === void 0 ? void 0 : userLeave.name} will be on ${leaveData.leaveType} leave from ${leaveData.startDate} to ${leaveData.endDate}`,
        leave,
    });
});
exports.requestLeave = requestLeave;
//get all leaves
const getAllLeaves = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const leaves = yield LeaveModel_1.default.find().populate(`user`);
    if (leaves.length > 0)
        return res.json({ status: true, leaves });
    return res.status(404).json({ status: false, message: 'no leaves found!' });
});
exports.getAllLeaves = getAllLeaves;
//get leave by leave id
const getLeaveById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const leave = yield LeaveModel_1.default.findById(req.params.id).populate(`user`);
    if (leave)
        return res.json({ status: true, leave });
    return res
        .status(404)
        .json({ status: false, message: 'No such leave found!' });
});
exports.getLeaveById = getLeaveById;
//see who is on leave for today
const getAbsentEmployeesForToday = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const startDateToday = `${date} 00:00:00`;
    const endDateToday = `${date} 23:59:59`;
    console.log(startDateToday, endDateToday);
    const leaves = yield LeaveModel_1.default.find({
        startDate: { $gte: new Date(startDateToday) },
        endDate: { $lte: new Date(endDateToday) },
    });
    console.log(leaves);
    if (leaves.length > 0)
        return res.json({ status: true, leaves });
    return res
        .status(404)
        .json({ status: false, msg: 'No employees on leave today' });
});
exports.getAbsentEmployeesForToday = getAbsentEmployeesForToday;
//see future leaves
const getFutureLeaves = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let referenceDate = (0, moment_1.default)().add(1, 'days').format();
    console.log(referenceDate);
    let futureDate = referenceDate.split('T')[0];
    console.log(futureDate);
    const leaves = yield LeaveModel_1.default.find({ startDate: { $gt: futureDate } }).populate('user');
    // console.log(leaves);
    if (leaves.length > 0)
        return res.json({ status: true, leaves });
    return res.status(404).json({ status: false, msg: 'no leaves found!' });
});
exports.getFutureLeaves = getFutureLeaves;
//update leave by id
const updateLeave = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const leave = yield LeaveModel_1.default.findById(req.params.id);
    if (leave) {
        const updatedLeave = yield LeaveModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        return res.json({ status: true, msg: 'Leave updated!', updatedLeave });
    }
    return res.status(404).json({ status: false, msg: 'Leave not found' });
});
exports.updateLeave = updateLeave;
