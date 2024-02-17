import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './Context/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
