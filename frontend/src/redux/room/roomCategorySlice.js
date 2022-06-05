import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import roomService from './roomService';

// Get rooms from localstorage
const rooms = JSON.parse(localStorage.getItem('rooms'));
const initialState = {
  rooms: rooms ? rooms : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// get all rooms
export const getRoomByCategory = createAsyncThunk(
  'rooms/category',
  async (data, thunkAPI) => {
    try {
      return await roomService.getRoomsByCategory(data);
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

export const roomCategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.rooms = [];
      state.message = '';
    },
    refresh: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: {
    [getRoomByCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [getRoomByCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.rooms = action.payload;
    },
    [getRoomByCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.rooms = null;
    },
  },
});

export const { reset, refresh } = roomCategorySlice.actions;
export default roomCategorySlice.reducer;
