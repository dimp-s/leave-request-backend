import { Router } from 'express';
const leaveRouter = Router();

leaveRouter.get('/', (req, res) => {
  res.send('our leaves');
});

export default leaveRouter;
