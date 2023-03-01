import { lazy } from "react";
import Loadable from "../components/Loadable";
import MinimalLayout from "../layout/MinimalLayout";

const printRoute = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "grid-test",
      children: [
      ]
    }
  ]
}

export default printRoute