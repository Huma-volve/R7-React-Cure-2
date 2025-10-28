import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout/Layout';
import Error from './Pages/Error/Error';
import Home from './Pages/Home/Home';
import DoctorDetails from './Pages/DoctorDetails/DoctorDetails';
import BookAppointment from './Pages/BookAppointment/BookAppointment';
import LogIn from './Pages/login/LogIn';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <Error />,
        children: [
            { path: '/', element: <Home /> },
            { path: "doctordetails", element: <DoctorDetails /> },
            { path: "bookappointment", element: <BookAppointment /> }
        ]
    },
    { path: "/login", element: <LogIn /> },]);
export default router;
