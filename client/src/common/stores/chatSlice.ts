import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { Socket } from 'socket.io-client';
import { Channel, ChannelInfo, Message } from '@/types';
import {
  getChannelsApi,
  getDetailedChannelApi,
  getMessagesInChannelApi
} from '@/api/chat';

interface ChatState {
  socket: Socket | null;
  channels: Channel[];
  activeChannel: string | null;
  messages: Message[];
  detailedChannel: ChannelInfo | null;
}

const initialState: ChatState = {
  socket: null,
  channels: [],
  activeChannel: null,
  messages: [],
  detailedChannel: null
};

export const getChannels = createAsyncThunk('getChannels', getChannelsApi);

export const getMessages = createAsyncThunk(
  'getMessages',
  getMessagesInChannelApi
);

export const getDetailedChannelInfo = createAsyncThunk(
  'getDetailedChannelInfo',
  getDetailedChannelApi
);

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    setActiveChannel: (state, action: PayloadAction<string | null>) => {
      state.activeChannel = action.payload;
    },
    setSocket: (state, action: PayloadAction<any>) => {
      state.socket = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      getChannels.fulfilled,
      (state, action: PayloadAction<AxiosResponse<any>>) => {
        if (action.payload.data.data) {
          state.channels = action.payload.data.data;
        }
      }
    );
    builder.addCase(
      getMessages.fulfilled,
      (state, action: PayloadAction<AxiosResponse<any>>) => {
        if (action.payload.data.data) {
          state.messages = action.payload.data.data;
        }
      }
    );
    builder.addCase(
      getDetailedChannelInfo.fulfilled,
      (state, action: PayloadAction<AxiosResponse<any>>) => {
        if (action.payload.data.data) {
          state.detailedChannel = action.payload.data.data;
        }
      }
    );
  }
});

export const { setMessages, setSocket, setActiveChannel } = chatSlice.actions;

export default chatSlice.reducer;
