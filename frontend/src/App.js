import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  HomeScreen,
  RoomScreen,
  RoomInfoScreen,
  PageNotFound,
  RoomCategoryScreen,
  CheckOutScreen,
  BlogScreen,
  SingleBlogScreen,
  Terms,
  Privacy,
  Categories,
} from './screens';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeScreen />} />
          <Route path="/rooms" element={<RoomScreen />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/room/:id" element={<RoomInfoScreen />} />
          <Route path="/rooms/:category" element={<RoomCategoryScreen />} />
          <Route path="/rooms/:roomid/book" element={<CheckOutScreen />} />
          <Route path="/blogs" element={<BlogScreen />} />
          <Route path="/blogs/:id" element={<SingleBlogScreen />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer hideProgressBar newestOnTop={true} />
    </>
  );
}

export default App;
