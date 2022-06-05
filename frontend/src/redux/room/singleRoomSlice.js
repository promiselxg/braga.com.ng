import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import roomService from './roomService';

const initialState = {
  room: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// get single rooms
export const getSingleRoom = createAsyncThunk(
  'rooms/roomDetails',
  async (roomid, thunkAPI) => {
    try {
      return await roomService.getRoomDetails(roomid);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const singleRoomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: {
    [getSingleRoom.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingleRoom.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.room = action.payload;
    },
    [getSingleRoom.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.room = null;
    },
  },
});
export const { reset } = singleRoomSlice.actions;
export default singleRoomSlice.reducer;
