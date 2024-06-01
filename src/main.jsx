import React from 'react'
import ReactDOM from 'react-dom/client' 
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/Root/Root';
import AuthProvider from './components/Providers/AuthProvider';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AllScolarShip from './components/AllScolarShip/AllScolarShip';
import Profile from './components/Profile/Profile';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';


const router = createBrowserRouter([
  {
    path: "/",
    element:  <Root></Root>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/register',
        element:<Register></Register>
      },
      {
        path:'/allScholarShip',
        element:<AllScolarShip></AllScolarShip>
      },
      {
        path:'/profile',
        element:<Profile></Profile>
      },
      {
        path:'/updateProfile',
        element:<UpdateProfile></UpdateProfile>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
