import { Router } from 'express';
import { requestLeave } from '../controllers/leaveController';
const leaveRouter = Router();

leaveRouter.post('/reqLeave', requestLeave);

export default leaveRouter;
