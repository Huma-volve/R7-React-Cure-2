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
import LodaingPage from './components/loading/LodaingPage.tsx';

createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENT_ID}>
        <Provider store={store}>
            <Suspense fallback={<LodaingPage />}>

                <FavoriteProvider>
                    <RouterProvider router={router} />
                </FavoriteProvider>
            </Suspense>
        </Provider>
    </GoogleOAuthProvider>
);
