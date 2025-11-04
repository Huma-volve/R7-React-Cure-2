import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import router from './routes.tsx';
import store from './store/Store.ts';
import { store } from './store/Store';
import router from './routes/routes.tsx';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={router} />
        </Suspense>
    </Provider>
);
