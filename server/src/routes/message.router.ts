import { Router } from 'express';
import {
  getMessagesById,
} from '../controllers/message.controller';

const messageRouter = Router();

messageRouter.get('/:channelId', getMessagesById);

export default messageRouter;
