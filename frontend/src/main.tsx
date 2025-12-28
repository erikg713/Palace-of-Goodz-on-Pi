import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css'; // Essential for Tailwind CSS

/**
 * Palace of Goodz - Main Entry Point
 * This file bootstraps the React application.
 */

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Failed to find the root element. Check index.html.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* You might eventually wrap <App /> in a Web3Provider 
        to handle blockchain state globally.
      */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
