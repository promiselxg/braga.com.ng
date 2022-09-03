import { createContext, useReducer } from 'react';

const INITIAL_STATE = {
  roomInfo: null,
  room: null,
  loading: false,
  isLoading: false,
  error: null,
};

export const RoomContext = createContext(INITIAL_STATE);

const RoomReducer = (state, action) => {
  switch (action.type) {
    case 'ROOM_INFO_START':
      return {
        ...state,
        roomInfo: null,
        loading: true,
        error: null,
      };
    case 'ROOM_INFO_SUCCESS':
      return {
        ...state,
        roomInfo: action.payload,
        loading: false,
        error: null,
      };
    case 'ROOM_INFO_FAILURE':
      return {
        ...state,
        roomInfo: null,
        loading: false,
        error: action.payload,
      };
    case 'ROOM_SORT_START':
      return {
        ...state,
        roomInfo: null,
        loading: true,
        error: null,
      };
    case 'ROOM_SORT_SUCCESS':
      return {
        ...state,
        roomInfo: action.payload,
        loading: false,
        error: null,
      };
    case 'ROOM_SORT_FAILURE':
      return {
        ...state,
        roomInfo: null,
        loading: false,
        error: action.payload,
      };
    case 'SINGLE_ROOM_INFO_START':
      return {
        ...state,
        room: null,
        isLoading: true,
        error: null,
      };
    case 'SINGLE_ROOM_INFO_SUCCESS':
      return {
        ...state,
        room: action.payload,
        isLoading: false,
        error: null,
      };
    case 'SINGLE_ROOM_INFO_FAILURE':
      return {
        ...state,
        room: null,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const RoomContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RoomReducer, INITIAL_STATE);

  return (
    <RoomContext.Provider
      value={{
        roomInfo: state.roomInfo,
        room: state.room,
        isLoading: state.isLoading,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
