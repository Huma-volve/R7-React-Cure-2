import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import './index.css'
import { store } from './store/Store';
import { RouterProvider } from 'react-router-dom';
import router from './routes.tsx';
import { Suspense } from 'react';

createRoot(document.getElementById('root')!).render(
  < Provider store={store} >
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </Provider >,
)
