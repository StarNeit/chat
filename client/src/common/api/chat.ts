import axios from 'axios';
import { CreateChannel } from '@/types';

export const getChannelsApi = () => {
  return axios.get('/channel');
};

export const getDetailedChannelApi = (id: string) => {
  return axios.get(`/channel/${id}`);
};

export const removeChannelApi = (id: string) => {
  return axios.delete(`/channel/${id}`);
};

export const createChannelApi = (payload: CreateChannel) => {
  return axios.post('/channel', payload);
};

export const removeUserApi = (payload: {
  userId: string;
  channelId: string;
}) => {
  return axios.post('/channel/remove-user', payload);
};

export const confirmChannelPasswordApi = (payload: {
  id: string;
  password: string;
}) => {
  return axios.post('/channel/password', payload);
};

export const getMessagesInChannelApi = (channelId: string) => {
  return axios.get(`/message/${channelId}`);
};
