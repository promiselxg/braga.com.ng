import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import 'antd/dist/antd.min.css';
import { AuthContextProvider } from './context/AuthContext';
import { RoomContextProvider } from './context/RoomContext';
import { BlogContextProvider } from './context/BlogContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <RoomContextProvider>
      <BlogContextProvider>
        <BrowserRouter>
          <GlobalStyle />
          <App />
        </BrowserRouter>
      </BlogContextProvider>
    </RoomContextProvider>
  </AuthContextProvider>
);
