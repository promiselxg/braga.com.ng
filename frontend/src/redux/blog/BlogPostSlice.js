import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogService from './blogService';

// Get rooms from localstorage
const posts = JSON.parse(localStorage.getItem('posts'));
const initialState = {
  posts: posts ? posts : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  post: null,
  message: '',
};

// get all rooms
export const getBlogPosts = createAsyncThunk('blog/all', async (thunkAPI) => {
  try {
    return await blogService.getAllBlogPost();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
// get all rooms
export const getSingleBlogPost = createAsyncThunk(
  'blog/post',
  async (id, thunkAPI) => {
    try {
      return await blogService.getSingleBlogPost(id);
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

export const blogPostSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.posts = [];
      state.post = [];
      state.message = '';
    },
    refresh: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: {
    [getBlogPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [getBlogPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.posts = action.payload;
    },
    [getBlogPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.posts = null;
    },
    [getSingleBlogPost.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingleBlogPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.post = action.payload;
    },
    [getSingleBlogPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.post = null;
    },
  },
});

export const { reset, refresh } = blogPostSlice.actions;
export default blogPostSlice.reducer;
