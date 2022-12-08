import { RequestHandler } from 'express';
import _ from 'lodash';
import moment from 'moment';
import Leave, { LeaveModel, LeaveType } from '../model/LeaveModel';
import User from '../model/UserModel';

//add new leave request
export const requestLeave: RequestHandler = async (req, res) => {
  const leaveData: LeaveModel = _.pick(req.body, [
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
          message:
            'Start Date should be at least on same or prior date than end date',
        });
      }
    }

    if (startDate <= new Date()) {
      return res.status(400).json({
        status: false,
        msg: "Start Date should not be less than today's date",
      });
    }
  } else {
    return res
      .status(400)
      .json({ status: false, msg: 'Start date is required :(' });
  }

  if (req.body.leaveType) {
    const checkLeave = await Leave.findOne({
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
  const leave = await Leave.create(leaveData);

  const userLeave = await User.findById(req.body.user);
  //return success
  return res.json({
    status: true,
    msg: `${userLeave?.name} will be on ${leaveData.leaveType} leave from ${leaveData.startDate} to ${leaveData.endDate}`,
    leave,
  });
};

//get all leaves
export const getAllLeaves: RequestHandler = async (req, res) => {
  const leaves = await Leave.find().populate(`user`);
  if (leaves.length > 0) return res.json({ status: true, leaves });
  return res.status(404).json({ status: false, message: 'no leaves found!' });
};

//get leave by leave id
export const getLeaveById: RequestHandler = async (req, res) => {
  const leave = await Leave.findById(req.params.id).populate(`user`);
  if (leave) return res.json({ status: true, leave });
  return res
    .status(404)
    .json({ status: false, message: 'No such leave found!' });
};

//see who is on leave for today
export const getAbsentEmployeesForToday: RequestHandler = async (req, res) => {
  var today = new Date();
  console.log(today);
  var date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const startDateToday = `${date} 00:00:00`;
  const endDateToday = `${date} 23:59:59`;
  console.log(startDateToday, endDateToday);
  const leaves = await Leave.find({
    startDate: { $gte: new Date(startDateToday) },
    // endDate: { $lte: new Date(endDateToday) },
  });
  // console.log(leaves);
  if (leaves.length > 0) return res.json({ status: true, leaves });
  return res
    .status(404)
    .json({ status: false, msg: 'No employees on leave today' });
};

//see future leaves
export const getFutureLeaves: RequestHandler = async (req, res) => {
  let referenceDate = moment().add(1, 'days').format();
  console.log(referenceDate);
  let futureDate = referenceDate.split('T')[0];
  console.log(futureDate);
  const leaves = await Leave.find({ startDate: { $gt: futureDate } }).populate(
    'user'
  );
  // console.log(leaves);

  if (leaves.length > 0) return res.json({ status: true, leaves });
  return res.status(404).json({ status: false, msg: 'no leaves found!' });
};

//update leave by id
export const updateLeave: RequestHandler = async (req, res) => {
  const leave = await Leave.findById(req.params.id);
  if (leave) {
    const updatedLeave = await Leave.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    return res.json({ status: true, msg: 'Leave updated!', updatedLeave });
  }
  return res.status(404).json({ status: false, msg: 'Leave not found' });
};
