import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './component/Layout';
import { AuthContext } from './context/AuthContext';
import {
  AddBlogPost,
  AddGallery,
  AddRooms,
  AllUsers,
  BlogPost,
  Bookings,
  Customers,
  Dashboard,
  EditBooking,
  EditGallery,
  EditRoom,
  Gallery,
  Login,
  Reviews,
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
          path="/reviews"
          element={
            <ProtectedRoute>
              <Reviews />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gallery"
          element={
            <ProtectedRoute>
              <Gallery />
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
          path="/blog"
          element={
            <ProtectedRoute>
              <BlogPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <AllUsers />
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
          path="/blog/new"
          element={
            <ProtectedRoute>
              <AddBlogPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gallery/new"
          element={
            <ProtectedRoute>
              <AddGallery />
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
          path="/gallery/:id/edit"
          element={
            <ProtectedRoute>
              <EditGallery />
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
