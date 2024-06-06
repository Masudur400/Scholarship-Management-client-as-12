import React from 'react'
import ReactDOM from 'react-dom/client' 
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { 
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import Root from './components/Root/Root';
import AuthProvider from './components/Providers/AuthProvider';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AllScolarShip from './components/AllScolarShip/AllScolarShip';
import Profile from './components/Profile/Profile';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import DashBoard from './dashBoard/DashBoard/DashBoard';
import ManageUsers from './dashBoard/ManageUsers/ManageUsers';
import DashBoardProfile from './dashBoard/DashBoardProfile/DashBoardProfile';
import AddScholarShip from './dashBoard/AddScholarship/AddScholarShip';
import ScholarshipDetails from './components/AllScolarShip/ScholarshipDetails';
import ManageScholarship from './dashBoard/ManageSchoralship/ManageScholarship';
import UpdateScholarship from './dashBoard/ManageSchoralship/UpdateScholarship';
import ManageScholarshipDetails from './dashBoard/ManageSchoralship/ManageScholarshipDetails';
import Apply from './dashBoard/Apply/Apply'; 
import Payment from './dashBoard/Payment/Payment';
import MyApplycation from './dashBoard/MyApplycation/MyApplycation';


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
      },
      {
        path:'/scholarship/:id',
        element:<ScholarshipDetails></ScholarshipDetails> ,
        loader:({params})=> fetch(`http://localhost:5000/scholarships/${params.id}`)
      },
      
      
    ]
  },
  {
    path:'dashboard',
    element:<DashBoard></DashBoard>,
    children:[
      
      {
        path:'dashboardProfile',
        element:<DashBoardProfile></DashBoardProfile>
      },
      // admin routes 
      {
        path: 'users',
        element:<ManageUsers></ManageUsers>
      },
      {
        path:'addScholarship',
        element:<AddScholarShip></AddScholarShip>
      },
      {
        path:'manageScholarship',
        element:<ManageScholarship></ManageScholarship>
      },
      {
        path:'update/:id',
        element:<UpdateScholarship></UpdateScholarship>,
        loader:({params})=> fetch(`http://localhost:5000/scholarships/${params.id}`)
      },
      {
        path:'apply/:id',
        element:<Apply></Apply>,
        loader:({params})=> fetch(`http://localhost:5000/scholarships/${params.id}`)
      },
      {
        path:'payment/:id',
        element:<Payment></Payment>,
        loader:({params})=> fetch(`http://localhost:5000/scholarships/${params.id}`)
      },
      {
        path:'manageScholarshipDetails/:id',
        element:<ManageScholarshipDetails></ManageScholarshipDetails>,
        loader:({params})=> fetch(`http://localhost:5000/scholarships/${params.id}`)
      },
      {
        path:'myApplication',
        element:<MyApplycation></MyApplycation>
      }
      

// moderator routes 

    ]
  }
]);

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
     <QueryClientProvider client={queryClient}>
     <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
    </QueryClientProvider> 
    
  </React.StrictMode>,
)
