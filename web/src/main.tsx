import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { AuthProvider } from './contexts/Auth/AuthProvider';
import { ModalProvider } from './contexts/Modal/ModalProvider';
import { ThemeProvider } from './contexts/Theme/ThemeProvider';

import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <ModalProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ModalProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
)
