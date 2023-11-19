import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Secret from "../pages/Shared/Secret/Secret";
import DashBord from "../Layout/DashBord";
import Cart from "../pages/DashBord/Cart/Cart";
import Allusers from "../pages/DashBord/Allusers/Allusers.JSX";
import AddItems from "../pages/DashBord/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItem from "../pages/DashBord/ManageItem/ManageItem";
import UpdatedItem from "../pages/DashBord/UpdatedItem/UpdatedItem";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "menu",
        element: <Menu></Menu>,
      },
      {
        path: "order/:category",
        element: <Order></Order>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "secret",
        element: (
          <PrivateRoute>
            <Secret></Secret>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashBord",
    element: (
      <PrivateRoute>
        <DashBord></DashBord>
      </PrivateRoute>
    ),
    children: [
      {
        path: "cart",
        element: <Cart></Cart>,
      },
      // NOTE admin Routs
      {
        path: "addItems",
        element: (
          <AdminRoute>
            <AddItems />
          </AdminRoute>
        ),
      },
      {
        path: "manageItem",
        element: (
          <AdminRoute>
            <ManageItem />
          </AdminRoute>
        ),
      },
      {
        path: `/dashBord/updateItem/:id`,
        element: (
          <AdminRoute>
            <UpdatedItem />
          </AdminRoute>
        ),
        // loader: ({ params }) =>
        //   fetch(`http://localhost:5000/menu/${params.id}`),
      },
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <Allusers></Allusers>
          </AdminRoute>
        ),
      },
    ],
  },
]);
