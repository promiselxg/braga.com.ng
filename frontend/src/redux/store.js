import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './room/roomSlice';
import singleRoomReducer from './room/singleRoomSlice';
import roomCategoryReducer from './room/roomCategorySlice';
import roomReservationReducer from './room/roomReservationSlice';
import roomPaymentReducer from './room/roomPaymentSlice';
export const store = configureStore({
  reducer: {
    listRooms: roomReducer,
    roomInfo: singleRoomReducer,
    roomCategory: roomCategoryReducer,
    reservation: roomReservationReducer,
    payment: roomPaymentReducer,
    userInfo: '',
  },
});
