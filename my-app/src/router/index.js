import { createBrowserRouter, useNavigate } from "react-router-dom";
import React, { useEffect, Suspense } from "react";
//  引入组件
import Login from "@src/views/login/Login.jsx"
const Home = React.lazy(() => import("../views/home/Home.jsx"))
const Person = React.lazy(() => import("../views/home/person/Person.jsx"))
const Child = React.lazy(() => import("../views/home/child/Child.jsx"))
const Root = React.lazy(() => import("../views/home/root/Root.jsx"))
const Member = React.lazy(() => import("../views/home/member/Member.jsx"))

// 创建路由表
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Suspense> <Home /></Suspense>,
    children: [
      {
        path: "child",
        element: <Suspense> <Child /></Suspense>,
      },
      {
        path: "root",
        element: <Suspense> <Root /></Suspense>,
      },
      {
        path: "person",
        element: <Suspense> <Person /></Suspense>,
      },
      {
        path: "member",
        element: <Suspense> <Member /></Suspense>,
      },

    ]
  },

  // {
  //   path: "*",
  //   element: <Redirect to="/" />,
  // },
]);


// 设置重定向
// function Redirect({ to }) {
//   let navigate = useNavigate();
//   useEffect(() => {
//     navigate(to);
//   });
//   return null;
// }

export default router;

