// frontend/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// 1. Import Bootstrap CSS
import '../public/assets/css/bootstrap.min.css';
import '../public/assets/css/slick.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// 2. Import Font Awesome (needed for icons in Footer/Header)
import '../public/assets/css/all.css';

// 3. Import your custom CSS
import '../public/assets/css/main.css'; 
import App from './App.jsx';
import './index.css'; 
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./redux/store";
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>    {/* 👈 Wrap App with BrowserRouter */}
    <BrowserRouter>
      <App />    <Toaster/>
    </BrowserRouter></PersistGate>
</Provider>
  </React.StrictMode>,
);
