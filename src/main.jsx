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
import MyApplicationDetails from './dashBoard/MyApplycation/MyApplicationDetails';
import EditApplication from './dashBoard/MyApplycation/EditApplication';
import MyReviews from './dashBoard/MyReviews/MyReviews';
import AllReview from './dashBoard/AllReview/AllReview';
import AllAppliedScholarship from './dashBoard/AllAppliedScholarship/AllAppliedScholarship';
import Details from './dashBoard/AllAppliedScholarship/Details';
import PrivetRoute from './SecureRoute/PrivetRoute';
import AdminRoute from './SecureRoute/AdminRoute'; 
import OnlyAdminRoute from './SecureRoute/OnlyAdminRoute';




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
        element:<PrivetRoute><AllScolarShip></AllScolarShip></PrivetRoute>
      },
      {
        path:'/profile',
        element:<PrivetRoute><Profile></Profile></PrivetRoute>
      },
      {
        path:'/updateProfile',
        element:<PrivetRoute><UpdateProfile></UpdateProfile></PrivetRoute>
      },
      {
        path:'/scholarship/:id',
        element:<PrivetRoute><ScholarshipDetails></ScholarshipDetails></PrivetRoute> ,
        // loader:({params})=> fetch(`https://assignment-twelve-server-two.vercel.app/scholarship/${params.id}`)
      },
      
      
    ]
  },
  {
    path:'dashboard',
    element: <PrivetRoute><DashBoard></DashBoard></PrivetRoute> ,
    children:[
      
      {
        path:'dashboardProfile',
        element: <PrivetRoute><DashBoardProfile></DashBoardProfile></PrivetRoute> 
      },
      // admin routes 
      {
        path: 'users',
        element:<OnlyAdminRoute><ManageUsers></ManageUsers></OnlyAdminRoute> 
      },
      {
        path:'addScholarship',
        element: <AdminRoute><AddScholarShip></AddScholarShip></AdminRoute> 
      },
      {
        path:'manageScholarship',
        element:<AdminRoute><ManageScholarship></ManageScholarship></AdminRoute> 
      },
      {
        path:'update/:id',
        element: <AdminRoute><UpdateScholarship></UpdateScholarship></AdminRoute>
           
        // loader:({params})=> fetch(`https://assignment-twelve-server-two.vercel.app/scholarships/${params.id}`)
      },
      {
        path:'apply/:id',
        element: <PrivetRoute><Apply></Apply></PrivetRoute>
         
        // loader:({params})=> fetch(`https://assignment-twelve-server-two.vercel.app/scholarships/${params.id}`)
      },
      {
        path:'payment/:id',
        element:  <PrivetRoute><Payment></Payment></PrivetRoute>
         ,
        // loader:({params})=> fetch(`https://assignment-twelve-server-two.vercel.app/scholarships/${params.id}`)
      },
      {
        path:'manageScholarshipDetails/:id',
        element:<AdminRoute><ManageScholarshipDetails></ManageScholarshipDetails></AdminRoute>
           
        // loader:({params})=> fetch(`https://assignment-twelve-server-two.vercel.app/scholarships/${params.id}`)
      },
      {
        path:'myApplication',
        element:<PrivetRoute><MyApplycation></MyApplycation></PrivetRoute>
         
      },
      {
        path:'myApplicationDetails/:id',
        element: <PrivetRoute><MyApplicationDetails></MyApplicationDetails></PrivetRoute>
        
        // loader:({params}) => fetch(`https://assignment-twelve-server-two.vercel.app/applies/${params.id}`)
      },
      {
        path:'editApplication/:id',
        element: <PrivetRoute><EditApplication></EditApplication></PrivetRoute>
         
        // loader:({params}) => fetch(`https://assignment-twelve-server-two.vercel.app/applies/${params.id}`)
      }, 
      {
        path:'myReviews',
        element: <PrivetRoute><MyReviews></MyReviews></PrivetRoute> 
      },
      {
        path:'allReview',
        element:  <AdminRoute><AllReview></AllReview> </AdminRoute>
      },
      {
        path:'allAppliedScholarship',
        element: <AdminRoute><AllAppliedScholarship></AllAppliedScholarship></AdminRoute>
          
      },
      {
        path:'details/:id',
        element:<AdminRoute><Details></Details></AdminRoute>,
        // loader:({params}) => fetch(`https://assignment-twelve-server-two.vercel.app/applies/${params.id}`)
      } 

    ]
  }
]);

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
     <AuthProvider> 
      
     <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
     
    </AuthProvider> 
  </React.StrictMode>,
)
