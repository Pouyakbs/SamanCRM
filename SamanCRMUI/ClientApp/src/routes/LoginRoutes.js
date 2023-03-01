import { lazy } from "react";

// project import
import Loadable from "../components/Loadable";
import MinimalLayout from "../layout/MinimalLayout";
import { PrivateRoute } from "../components/PrivateRoute";
import MainLayout from "../layout/MainLayout";

// render - login
const AuthLogin = Loadable(lazy(() => import("../pages/authentication/Login")));
//render - PasswordSettings
const AuthSetting = Loadable(
  lazy(() => import("../pages/authentication/AuthSetting"))
);
const AuthChangePassword = Loadable(
  lazy(() => import("../pages/authentication/AuthChangePassword"))
);
const AuthRegister = Loadable(
  lazy(() => import("../pages/authentication/Register"))
);
const GetAllUsers = Loadable(
  lazy(() => import("../pages/authentication/GetAllUsers"))
);

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "login",
      element: <AuthLogin />,
    },
    {
      path: "PasswordSettings",
      element: (
        <PrivateRoute>
          <AuthSetting />
        </PrivateRoute>
      ),
    },
    {
      path: "ChangePassword",
      element: (
        <PrivateRoute>
          <AuthChangePassword />
        </PrivateRoute>
      ),
    },
    {
      path: "register",
      element: (
        
        <PrivateRoute>
          <AuthRegister />
          </PrivateRoute>
      ),
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "getAllUsers",
          element: (<PrivateRoute><GetAllUsers /></PrivateRoute>),
        },
      ],
    },
  ],
};

export default LoginRoutes;
