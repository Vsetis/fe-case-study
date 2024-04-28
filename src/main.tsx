import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';
import Routes from './routes/routes.tsx';
import { ToastDemo, ToastProvider } from '@/components/ui/toast.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider>
                <ToastProvider swipeDirection="right">
                    <Routes />
                    <ToastDemo />
                </ToastProvider>
            </Provider>
        </QueryClientProvider>
    </React.StrictMode>
);
