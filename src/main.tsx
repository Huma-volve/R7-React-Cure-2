import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import router from './routes.tsx';

import { store } from './store/Store';
import { FavoriteProvider } from './context/FavoriteContext.tsx';

import { GoogleOAuthProvider } from '@react-oauth/google'
const GOOGLE_CLIENT_ID = "60136975563-f3l7uhdpim7ciikh8rkt0qafdim77pcj.apps.googleusercontent.com";
console.log("Client8888888 ID:", GOOGLE_CLIENT_ID);

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <FavoriteProvider>
                    <RouterProvider router={router} />
                </FavoriteProvider>
            </GoogleOAuthProvider>
        </Suspense>
    </Provider>
);
