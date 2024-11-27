// @ts-ignore
import data from './data.json';
import { ChannelModel, UserModel, MessageModel } from '../models';
import '../config/mongoose';

const { users, channels } = data;

(async () => {
  await UserModel.deleteMany({});
  await ChannelModel.deleteMany({});
  await MessageModel.deleteMany({});

  for (const user of users) {
    const newUser = await new UserModel(user);
    await newUser.save();
  }

  for (const channel of channels) {
    const newChannel = await new ChannelModel({ name: channel.name });
    await newChannel.save();
  }

  console.log('Seeding initial database is finished successfully');
})();
