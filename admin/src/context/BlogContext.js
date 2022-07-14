import { createContext, useReducer } from 'react';

const INITIAL_STATE = {
  blog: null,
  loading: false,
  error: null,
};

export const BlogContext = createContext(INITIAL_STATE);

const BlogReducer = (state, action) => {
  switch (action.type) {
    case 'BLOG_START':
      return {
        blog: null,
        loading: true,
        error: null,
      };
    case 'BLOG_SUCCESS':
      return {
        blog: action.payload,
        loading: false,
        error: null,
      };
    case 'BLOG_FAILURE':
      return {
        blog: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const BlogContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BlogReducer, INITIAL_STATE);

  return (
    <BlogContext.Provider
      value={{
        blog: state.blog,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
