import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import Marathons from "../Pages/Marathons/Marathons";
import AddMarathons from "../Pages/AddMarathons/AddMarathons";
import MyMarathons from "../Pages/MyMarathons/MyMarathons";
import MyApply from "../Pages/MyApply/MyApply";
import PrivateRoute from "./PrivateRoute";
import MarathonDetails from "../Pages/MarathonDetails/MarathonDetails";
import ErrorPage from "../Pages/Error/ErrorPage";
import RegisterForm from "../Pages/RegisterForm/RegisterForm";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true, 
                element: <Home></Home>,
            },
            {
                path: '/home',
                element: <Home></Home>,
            },
            {
                path: "/marathon/:id",
                element: <PrivateRoute><MarathonDetails></MarathonDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/marathon/${params.id}`, { credentials: 'include' })
            },
            {
                path: '/register-marathon/:id',
                element: <PrivateRoute><RegisterForm></RegisterForm></PrivateRoute>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/marathon/${params.id}`, { credentials: 'include' })
            },
            
            {
                path: '/marathons',
                element: <PrivateRoute><Marathons></Marathons></PrivateRoute>,
            },
            {
                path: 'add-marathons',
                element: <PrivateRoute><AddMarathons></AddMarathons></PrivateRoute>,
            },
            {
                path: 'my-marathons',
                element: <PrivateRoute><MyMarathons></MyMarathons></PrivateRoute>,
            },
            {
                path: '/my-apply',
                element: <PrivateRoute><MyApply></MyApply></PrivateRoute>,
            },
            {
                path:'/login',
                element:<Login></Login>,
            },
            {
                path:'/register',
                element:<Register></Register>
            },
        ]
    }
])

export default router;