import { Router } from 'express';
import {
  login,
  get,
} from '../controllers/user.controller';

const userRouter = Router();

userRouter.post('/', login);
userRouter.get('/:id', get);

export default userRouter;