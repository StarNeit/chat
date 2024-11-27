import React, { useEffect } from 'react';
import { Channels, Chat } from '@/components';
import socketClient from 'socket.io-client';
import { ChannelInfo } from '@/components/ChannelInfo';
import { useAppDispatch, useAppSelector } from '@/stores';
import {
  setSocket,
  getChannels,
  getDetailedChannelInfo,
  setMessages,
  setActiveChannel
} from '@/stores/chatSlice';

const SERVER = 'http://localhost:8080';

const socket = socketClient(SERVER, { path: '/api/chat' });

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeChannel, messages } = useAppSelector((state) => state.chat);

  const { profile } = useAppSelector((state) => state.profile);

  useEffect(() => {
    dispatch(setSocket(socket));
    socket.on('connection', () => {
      console.log(`I'm connected with the back-end`);
    });
    socket.on('channel-join', (channel) => {
      dispatch(getDetailedChannelInfo(channel.id));
    });
    socket.on('channel-leave', (channelId) => {
      dispatch(getDetailedChannelInfo(channelId));
    });
    socket.on('channel-create', async () => {
      dispatch(getChannels());
    });
  }, []);

  useEffect(() => {
    socket.on('message', (message) => {
      dispatch(setMessages([...messages, message]));
      activeChannel && dispatch(getDetailedChannelInfo(activeChannel));
    });
    socket.on('channel-remove', async (channelId) => {
      dispatch(getChannels());
      if (channelId === activeChannel) {
        dispatch(setActiveChannel(null));
      }
    });
    socket.on('channel-remove-user', async ({ userId, channelId }) => {
      activeChannel && dispatch(getDetailedChannelInfo(activeChannel));
      socket.emit('channel-leave-user', channelId);
      if (userId === profile?.id && channelId === activeChannel) {
        dispatch(setActiveChannel(null));
      }
    });

    return () => {
      socket.off('message');
      socket.off('channel-remove');
      socket.off('channel-remove-user');
    };
  }, [messages, activeChannel, profile]);

  return (
    <div className="flex gap-4">
      <div className="border border-gray-200 p-2 rounded-lg w-full max-w-[276px]">
        <Channels />
      </div>
      <div className="col-span-3 h-[calc(100vh-80px)] border border-gray-200 p-2 rounded-lg flex-1">
        <Chat />
      </div>
      <div className="p-2 border border-gray-200 rounded-lg w-full max-w-[276px]">
        <ChannelInfo />
      </div>
    </div>
  );
};
