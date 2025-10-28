import { createBrowserRouter } from 'react-router-dom';
import Error from './Pages/Error/Error';
import Home from './Pages/Home/Home';
import Layout from './layout/Layout';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <Error />,
        children: [{ path: '/', element: <Home /> }
        ]

    }
]);
export default router;
