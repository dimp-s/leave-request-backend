import { RequestHandler } from 'express';
import _ from 'lodash';
import Leave, { LeaveModel, LeaveType } from '../model/LeaveModel';
import User from '../model/UserModel';

//add new leave request
export const requestLeave: RequestHandler = async (req, res) => {
  const leaveData: LeaveModel = _.pick(req.body, [
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
