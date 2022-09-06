import { useEffect } from 'react';
import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './component/Layout';
import { AuthContext } from './context/AuthContext';
import jwtDecode from 'jwt-decode';
import {
  AddBlogPost,
  AddGallery,
  AddRooms,
  AllUsers,
  BlogPost,
  Bookings,
  Category,
  Customers,
  Dashboard,
  EditBlogPost,
  EditBooking,
  EditGallery,
  EditRoom,
  Gallery,
  Login,
  Reviews,
  Rooms,
} from './routes';

function App() {
  const { user, dispatch } = useContext(AuthContext);
  useEffect(() => {
    const verifyToken = () => {
      if (user) {
        const token = JSON.parse(localStorage.getItem('userInfo'));
        if (jwtDecode(token)?.exp < Date.now() / 1000) {
          localStorage.removeItem('userInfo');
          dispatch({ type: 'LOGOUT' });
        }
      }
    };
    verifyToken();
  }, [user, dispatch]);
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      window.location = '/login';
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
          path="/categories"
          element={
            <ProtectedRoute>
              <Category />
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
          path="/blog/:id/edit"
          element={
            <ProtectedRoute>
              <EditBlogPost />
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
