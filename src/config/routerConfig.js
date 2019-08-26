import { lazy } from "react";
import login from "../login/login";

// const Layout = lazy(() => import("../layouts/Layout"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
// const Home = lazy(() => import("../pages/Home/Home"));

const routerConfig = [
  {
    path: "/",
    layout: "",
    component: login,
    routes: []
  },
  // {
  //   path: "/主页",
  //   layout: "",
  //   component: Home,
  //   routes: []
  // },
  {
    path: "*",
    layout: "",
    component: NotFound,
    routes: []
  }
];

export default routerConfig;
