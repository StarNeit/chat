import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types';
import { getUserApi } from '@/api/user';
import { AxiosResponse } from 'axios';

interface ProfileState {
  profile: User | null;
}

const initialState: ProfileState = {
  profile: null
};

export const getProfile = createAsyncThunk('getProfile', getUserApi);

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<User>) {
      state.profile = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      getProfile.fulfilled,
      (state, action: PayloadAction<AxiosResponse<any>>) => {
        if (action.payload.data.data) {
          state.profile = action.payload.data.data;
        }
      }
    );
  }
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
