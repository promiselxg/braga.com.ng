import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './component/Layout';
import { AuthContext } from './context/AuthContext';
import {
  AddBooking,
  AddRooms,
  Bookings,
  Customers,
  Dashboard,
  EditBooking,
  EditRoom,
  Login,
  Rooms,
} from './routes';

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              <Rooms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rooms/new"
          element={
            <ProtectedRoute>
              <AddRooms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings/new"
          element={
            <ProtectedRoute>
              <AddBooking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rooms/:id/edit"
          element={
            <ProtectedRoute>
              <EditRoom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings/:id/edit"
          element={
            <ProtectedRoute>
              <EditBooking />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
