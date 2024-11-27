import { Socket } from "socket.io";
import { ChannelModel, MessageModel } from "../models";

export default (socket: Socket) => {
  socket.on('channel-join', async payload => {
    const { channelId, userId } = payload;

    try {
      const channel = await ChannelModel.findById(channelId);

      if (channel) {
        const filteredUsers = channel.users.filter((item) => item !== userId);
        await ChannelModel.updateOne({ _id: channelId }, {
          users: [...filteredUsers, userId],
        })
      }

      socket.join(channelId);
      socket.emit('channel-join', channel);
      socket.to(channelId).emit('channel-join', channel);
    } catch (e) {
      console.log(e);
    }
    return channelId;
  })

  socket.on('channel-leave', async (payload) => {
    const { channelId, userId } = payload;
    const channel = await ChannelModel.findById(channelId);
    if (channel) {
      const newUsers = channel.users.filter((item) => item !== userId);
      await ChannelModel.updateOne({ _id: channelId }, {
        users: newUsers
      });

      socket.leave(channelId);
      socket.to(channelId).emit('channel-leave', channelId);
    }
  })

  socket.on('channel-create', () => {
    socket.broadcast.emit('channel-create');
  })

  socket.on('channel-remove', (channelId) => {
    socket.broadcast.emit('channel-remove', channelId);
  })

  socket.on('channel-remove-user', (payload) => {
    socket.leave(payload.channelId);
    socket.broadcast.emit('channel-remove-user', payload);
  })

  socket.on('channel-leave-user', (channelId) => {
    socket.leave(channelId);
  })

  socket.on('send-message', async payload => {
    try {
      const newMessage = new MessageModel({
        channelId: payload.channelId,
        message: payload.message,
        userId: payload.userId,
      });
      await newMessage.save();
      const message = await MessageModel.findById(newMessage.id).populate('userId');
      socket.to(payload.channelId).emit('message', message);
      socket.emit('message', message);
    } catch (e) {
      console.log(e);
    }
  });
}