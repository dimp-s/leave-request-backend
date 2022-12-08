import { Router } from 'express';
import {
  getAbsentEmployeesForToday,
  getAllLeaves,
  getFutureLeaves,
  getLeaveById,
  requestLeave,
  updateLeave,
} from '../controllers/leaveController';
const leaveRouter = Router();

leaveRouter.post('/reqLeave', requestLeave);
leaveRouter.get('/allLeaves', getAllLeaves);
leaveRouter.get('/absentToday', getAbsentEmployeesForToday);
leaveRouter.get('/futureLeaves', getFutureLeaves);
leaveRouter.put('/updateLeave/:id', updateLeave);
leaveRouter.get('/:id', getLeaveById);

export default leaveRouter;
