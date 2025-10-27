import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout/Layout';
import Error from './pages/Error/Error';
import Home from './pages/Home/Home';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <Error />,
        children: [{ path: '/', element: <Home /> }]
    }
]);
export default router;
