import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "../App";
import Root from "../Layout/Root/Root";
import Login from "../Auth/Login/Login";
import Home from "../Pages/Home/Home";
import BeATrainer from "../Components/BeATrainer/BeATrainer";
import AllTrainer from "../Pages/AllTrainer/AllTrainer";
import TrainerDetailsPage from "../Pages/TrainerDetailsPage/TrainerDetailsPage";
import TrainerBookedPage from "../Pages/Trainer-Booked-Page/TrainerBookedPage";
import Deshboard from "../Pages/Deshboard/Deshboard";
import AppliedTrainer from "../Pages/AppliedTrainer/AppliedTrainer";
import Dashboard from "../Layout/Dashboard";
import Test from "../Pages/AppliedTrainer/Test";
import Newslatter from "../Pages/Newslatter/Newslatter";
import TrainerDashboard from "../Pages/Trainer/TrainerDashboard";
import Signup from "../Auth/SignUp/Signup";
import Trainers from "../Pages/Deshboard/Trainers/Trainers";
import AddNewSlot from "../Pages/Deshboard/AddNewSlot/AddNewSlot";
import AddnewClass from "../Pages/Deshboard/AddnewClass/AddnewClass";
import AllClasses from "../Pages/AllClasses/AllClasses";
import PaymentPage from "../Pages/PaymentPage/PaymentPage";
import Balance from "../Pages/Deshboard/Balance/Balance";
import PieChart from "../Pages/AppliedTrainer/Test";
import ManageSlot from "../Pages/Deshboard/ManageSlot/ManageSlot";
import AddForumPost from "../Pages/Deshboard/AddForumPost/AddForumPost";
import Community from "../Components/Community/Community";
import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";
import Layout from "../Pages/Profile/Layout";
import UserProfile from "../Pages/Profile/UserProfile";
import ActivityLogpage from "../Pages/Profile/ActivityLogpage/ActivityLogpage";
import BookedTrainers from "../Pages/BookedTrainer/BookedTrainers";
import DeshboardHome from "../Components/DeshboardHome/DeshboardHome";
import PaymentHistory from "../Pages/PaymentPage/PaymentHistory";
import ErrorPage from "../Components/ErrorPage/ErrorPage";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      errorElement:<ErrorPage/>,
      children: [
        {
            path:"/",
            element:<Home></Home>
        },
        {
            path: "/login",
            element:<Login></Login>
        },
        {
            path: "/signup",
            element:<Signup></Signup>
        },
        {
          path:"/beATrainer",
          element: <PrivateRoute><BeATrainer/></PrivateRoute>
        },
        {
          path:"/trainers",
          element: <AllTrainer></AllTrainer>
        },
        {
          path:"/trainers/:id",
          element: <PrivateRoute><TrainerDetailsPage></TrainerDetailsPage></PrivateRoute>
        },
        {
          path:"/trainers/:id/:time",
          element:<PrivateRoute><TrainerBookedPage></TrainerBookedPage></PrivateRoute>
        },
        {
          path:"/allclass",
          element:<AllClasses></AllClasses>
       
        },
        {
          path:"/payment",
          element:<PaymentPage></PaymentPage>
        },
        {
          path:"/paymentHistory",
          element:<PaymentHistory></PaymentHistory>
        },
        {
          path:"/community",
          element:<Community></Community>
        },
        {
          path:"/profile",
          element: <Layout></Layout>,
          children:[
            {
              path:"/profile",
              element: <UserProfile></UserProfile>
            },
            {
              path:"/profile/ActivityLogpage",
              element: <ActivityLogpage></ActivityLogpage>
            },
            {
              path:"/profile/BookedTrainers",
              element: <BookedTrainers></BookedTrainers>
            }
          ]
        }
      ]
    },
    {
      path:"/deshboard",
      element:<Dashboard></Dashboard>,
      children:[
        {
          path:"/deshboard",
          element:<PrivateRoute><DeshboardHome></DeshboardHome> </PrivateRoute> 
        },
        {
          path:"/deshboard/Balance",
          element:<PrivateRoute><Balance></Balance></PrivateRoute> 
        },
        {
          path:"/deshboard/appliedTrainer",
          element: <PrivateRoute><AppliedTrainer></AppliedTrainer></PrivateRoute> 
        },
        {
          path:"/deshboard/test",
          element: <PieChart></PieChart>
        },
        {
          path:"/deshboard/newslatter",
          element:<PrivateRoute> <Newslatter></Newslatter></PrivateRoute>
        },
        {
          path:"/deshboard/trainer",
          element:<PrivateRoute><TrainerDashboard></TrainerDashboard></PrivateRoute>
        },
        {
          path:"/deshboard/trainers",
          element:<PrivateRoute><Trainers></Trainers></PrivateRoute>
        },
        {
          path:"/deshboard/addslot",
          element:<PrivateRoute><AddNewSlot></AddNewSlot></PrivateRoute>
        },
        {
          path:"/deshboard/addnewclass",
          element:<PrivateRoute><AddnewClass></AddnewClass></PrivateRoute>
        },
        {
          path:"/deshboard/manageslot",
          element: <PrivateRoute><ManageSlot></ManageSlot></PrivateRoute>
        },
        {
          path:"/deshboard/addForumPost",
          element: <PrivateRoute><AddForumPost></AddForumPost></PrivateRoute>
        },
      ]
    },
    
  ]);

export default router;