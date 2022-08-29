import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import galleryService from './galleryService';

// Get rooms from localstorage
const banner = JSON.parse(localStorage.getItem('banner'));
const initialState = {
  banner: banner ? banner : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// get all gallery
export const getGallery = createAsyncThunk('blog/post', async (thunkAPI) => {
  try {
    return await galleryService.getGallery();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const gallerySlice = createSlice({
  name: 'gallery/banner',
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.banner = [];
      state.message = '';
    },
    refresh: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: {
    [getGallery.pending]: (state) => {
      state.isLoading = true;
    },
    [getGallery.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.banner = action.payload;
    },
    [getGallery.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.banner = null;
    },
  },
});

export const { reset, refresh } = gallerySlice.actions;
export default gallerySlice.reducer;
