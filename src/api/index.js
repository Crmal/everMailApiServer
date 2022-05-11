import { Router } from 'express';

import authRouter from './auth';
import sendMail from './sendMail';
import timeTableRouter from './timeTable';
import userRouter from './user';

const api = Router();

api.use('/auth', authRouter);
api.use('/user', userRouter);
api.use('/timeTable', timeTableRouter);
api.use('/sendMail', sendMail);

export default api;
