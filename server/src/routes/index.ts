import { Router } from 'express';
import channelRouter from './channel.router';
import messageRouter from './message.router';
import userRouter from './user.router';

const RootRouter = Router();

RootRouter.use('/channel', channelRouter);
RootRouter.use('/message', messageRouter);
RootRouter.use('/user', userRouter);

export default RootRouter;
