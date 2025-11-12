import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import router from './routes.tsx';
import { VITE_GOOGLE_CLIENT_ID } from './Google_ID.ts';
import { store } from './store/Store';
import { FavoriteProvider } from './context/FavoriteContext.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
            <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENT_ID}>
                <FavoriteProvider>
                    <RouterProvider router={router} />
                </FavoriteProvider>
            </GoogleOAuthProvider>
        </Suspense>
    </Provider>
);
