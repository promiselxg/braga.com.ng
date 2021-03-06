import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import GlobalStyle from './GlobalStyle';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { SearchContextProvider } from './context/SearchContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <SearchContextProvider>
      <BrowserRouter>
        <GlobalStyle />
        <App />
      </BrowserRouter>
    </SearchContextProvider>
  </Provider>
);
