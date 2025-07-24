import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // If you have global styles

// Import any necessary providers if you're using them
// For example, if you use React Router:
// import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrap with providers if needed, e.g.: */}
    {/* <BrowserRouter> */}
      <App />
    {/* </BrowserRouter> */}
  </React.StrictMode>
);