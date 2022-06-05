import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import roomService from './roomService';

const initialState = {
  error: false,
  success: false,
  loading: false,
  message: '',
};

// Process Payment
export const processPayment = createAsyncThunk(
  'rooms/reservation/payment',
  async (data, thunkAPI) => {
    try {
      return await roomService.payment(data);
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

export const roomPaymentSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      state.message = '';
    },
  },
  extraReducers: {
    [processPayment.pending]: (state) => {
      state.loading = true;
    },
    [processPayment.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.message = action.payload;
    },
    [processPayment.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.success = false;
      state.message = action.payload;
    },
  },
});
export const { reset } = roomPaymentSlice.actions;
export default roomPaymentSlice.reducer;
