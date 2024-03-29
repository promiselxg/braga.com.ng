import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './room/roomSlice';
import singleRoomReducer from './room/singleRoomSlice';
import roomReservationReducer from './room/roomReservationSlice';
import roomPaymentReducer from './room/roomPaymentSlice';
import blogPostReducer from './blog/BlogPostSlice';
import galleryReducer from './gallery/gallerySlice';
export const store = configureStore({
  reducer: {
    listRooms: roomReducer,
    roomInfo: singleRoomReducer,
    reservation: roomReservationReducer,
    payment: roomPaymentReducer,
    blog: blogPostReducer,
    banner: galleryReducer,
    userInfo: '',
  },
});
