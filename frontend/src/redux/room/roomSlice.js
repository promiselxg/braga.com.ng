import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import roomService from './roomService';

// Get rooms from localstorage
const rooms = JSON.parse(localStorage.getItem('rooms'));
const searchData = JSON.parse(localStorage.getItem('search'));

const initialState = {
  rooms: rooms ? rooms : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  checkIn: searchData ? searchData.checkIn : '',
  checkOut: searchData ? searchData.checkOut : '',
  message: '',
};

// get all rooms
export const getRooms = createAsyncThunk(
  'rooms/listRoom',
  async (data, thunkAPI) => {
    try {
      return await roomService.getAllRooms(data);
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

// get all rooms
export const filterRooms = createAsyncThunk(
  'rooms/filter',
  async (data, thunkAPI) => {
    try {
      return await roomService.filterRoom(data);
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

export const roomSlice = createSlice({
  name: 'room',
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
    setSuccess: (state) => {
      state.isSuccess = true;
    },
  },
  extraReducers: {
    [getRooms.pending]: (state) => {
      state.isLoading = true;
    },
    [getRooms.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.rooms = action.payload;
      state.checkIn = searchData?.checkIn;
      state.checkOut = searchData?.checkOut;
    },
    [getRooms.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.rooms = null;
    },
    [filterRooms.pending]: (state) => {
      state.isLoading = true;
    },
    [filterRooms.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.rooms = action.payload;
      state.checkIn = searchData?.checkIn;
      state.checkOut = searchData?.checkOut;
    },
    [filterRooms.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.rooms = null;
    },
  },
});

export const { reset, refresh, setSuccess, filterRoom } = roomSlice.actions;
export default roomSlice.reducer;
