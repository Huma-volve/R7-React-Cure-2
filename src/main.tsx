import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import router from './routes.tsx';

import { store } from './store/Store';
import { FavoriteProvider } from './context/FavoriteContext.tsx';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
                <FavoriteProvider>
                    <RouterProvider router={router} />
                </FavoriteProvider>
        </Suspense>
    </Provider>
);
