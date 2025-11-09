import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import router from './routes.tsx';

import { store } from './store/Store';
import { GoogleOAuthProvider } from '@react-oauth/google';
const ClintID = "https://60136975563-f3l7uhdpim7ciikh8rkt0qafdim77pcj.apps.googleusercontent.com"

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
            <GoogleOAuthProvider clientId={ClintID}>
                <RouterProvider router={router} />
            </GoogleOAuthProvider>
        </Suspense>
    </Provider>
);
