import { Router } from 'express';

import authRouter from './auth';
import timeTableRouter from './timeTable';
import userRouter from './user';

const api = Router();

api.use('/auth', authRouter);
api.use('/user', userRouter);
api.user('/timeTable', timeTableRouter);

export default api;
