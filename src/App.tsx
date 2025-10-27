import AOS from 'aos';
import 'aos/dist/aos.css';
import Layout from './components/layout/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';

export default function App() {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const Routing = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '/',
                    element: <HomePage />
                }
            ]
        }
    ]);

    return (
        <div>
            <RouterProvider router={Routing} />
        </div>
    );
}
