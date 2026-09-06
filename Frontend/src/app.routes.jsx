import {createBrowserRouter} from 'react-router';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Protected from './components/Protected.jsx';
import { Home } from './pages/Home.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { AllReports } from './pages/AllReports.jsx';
import { Layout } from './pages/Layout.jsx';

export const router = createBrowserRouter([




    {
        path : '/login',
        element : <Login />
    },
    {
        path : '/register',
        element : <Register />
    },

    {
        element : (
            <Protected><Layout></Layout></Protected>
        ),

        children : [
        {
            path : '/',
            element : <Home></Home>
        },
        {
            path : '/interview/:interviewID',
            element : <Dashboard></Dashboard>
        },
        {
            path : '/interview/reports',
            element : <AllReports></AllReports>
        }]
    }
]) 

