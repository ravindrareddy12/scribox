// src/components/App.js
import React from 'react';
import {
createBrowserRouter,
RouterProvider,
} from "react-router-dom";
import ChallengeList from '../components/ChallengeList';
import Login from '../components/Login';
import Register from '../components/Register';
import ChallengeForm from '../components/ChallengeForm';
import HomePage from '../components/HomePage';

function AppRouters() {
const router = createBrowserRouter([
    {
        path: "/", element: <HomePage />,
        
    },
    {
        path: "/login",element: <Login />,
    },
    {
        path: "/register",element: <Register />,
    },
    {
        path: "/challenge",element: <ChallengeForm />,
    },
    {
        path:"/challenge-list",element: <ChallengeList/>
    }
    
]);
return (
<>
<RouterProvider router={router} />
</>
);
}
export default AppRouters;
