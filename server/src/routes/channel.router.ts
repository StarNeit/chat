import { Router } from 'express';
import {
  list,
  get,
  create,
  confirmChannel,
  remove,
  removeUser,
} from '../controllers/channel.controller';

const channelRouter = Router();

channelRouter.get('/', list);
channelRouter.get('/:id', get);
channelRouter.post('/', create);
channelRouter.post('/password', confirmChannel);
channelRouter.delete('/:id', remove);
channelRouter.post('/remove-user', removeUser);

export default channelRouter;
