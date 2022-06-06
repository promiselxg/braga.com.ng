import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import roomService from './roomService';

const initialState = {
  isError: false,
  isSuccess: false,
  isCompleted: false,
  isLoading: false,
  message: '',
  data: '',
};

// Make reservation
export const makeReservation = createAsyncThunk(
  'rooms/reservation',
  async (data, thunkAPI) => {
    try {
      return await roomService.roomReservation(data);
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
// Initiate Payment
export const startPayment = createAsyncThunk(
  'reservation/payment',
  async (data, thunkAPI) => {
    try {
      return await roomService.roomReservation(data);
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
export const roomReservationSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.isCompleted = false;
      state.message = '';
    },
  },
  extraReducers: {
    [makeReservation.pending]: (state) => {
      state.isLoading = true;
    },
    [makeReservation.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload;
    },
    [makeReservation.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    },
    [startPayment.pending]: (state) => {
      state.isLoading = true;
    },
    [startPayment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isCompleted = true;
      state.isError = false;
      state.record = action.payload;
    },
    [startPayment.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isCompleted = false;
      state.message = action.payload;
    },
  },
});
export const { reset } = roomReservationSlice.actions;
export default roomReservationSlice.reducer;
