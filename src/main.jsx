import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routes from './routes';
import { Toaster } from '@/components/ui/sonner';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';
import { AuthProvider } from './context/AuthContext';
import { registerSW } from 'virtual:pwa-register';

registerSW();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster
          richColors
          visibleToasts={1}
          closeButton
          expand={false}
          position="bottom-left"
        />
        <Routes />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
