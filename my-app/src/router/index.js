import { createBrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";
//  引入组件
import Login from "@src/views/login/Login.jsx"
const Home = React.lazy(() => import("../views/home/Home.jsx"))
const Person = React.lazy(() => import("../views/home/person/Person.jsx"))
const Child = React.lazy(() => import("../views/home/child/Child.jsx"))
const Root = React.lazy(() => import("../views/home/root/Root.jsx"))
const Member = React.lazy(() => import("../views/home/member/Member.jsx"))
const MemberChange = React.lazy(() => import("../views/home/member/MemberChange.jsx"))
const Fund = React.lazy(() => import("../views/home/fund/Fund.jsx"))
const FundChild = React.lazy(() => import("../views/home/fund/fundChild/FundChild.jsx"))
const Recharge = React.lazy(() => import("../views/home/fund/fundChild/Recharge.jsx"))
const Cashmanage = React.lazy(() => import("../views/home/fund/fundChild/Cashmanage.jsx"))

const Proxy = React.lazy(() => import("../views/home/proxy/Proxy.jsx"))
const ProxyChild = React.lazy(() => import("../views/home/proxy/proxyChild/ProxyChild.jsx"))
const Cash = React.lazy(() => import("../views/home/proxy/proxyChild/Cash.jsx"))
const Invite = React.lazy(() => import("../views/home/proxy/proxyChild/Invite.jsx"))
const Commission = React.lazy(() => import("../views/home/proxy/proxyChild/Commission.jsx"))



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
      {
        path: "memchange",
        element: <Suspense> <MemberChange /></Suspense>,
      },
      {
        path: "fund",
        element: <Suspense> <Fund /></Suspense>,
        children: [
          {
            path: "child",
            element: <Suspense> <FundChild /></Suspense>,
          },
          {
            path: "recharge",
            element: <Suspense> <Recharge /></Suspense>,
          },
          {
            path: "cashmanage",
            element: <Suspense> <Cashmanage /></Suspense>,
          },
        ]
      },
      {
        path: "proxy",
        element: <Suspense> <Proxy /></Suspense>,
        children: [
          {
            path: "child",
            element: <Suspense> <ProxyChild /></Suspense>,
          },
          {
            path: "Cash",
            element: <Suspense> <Cash /></Suspense>,
          },
          {
            path: "invite",
            element: <Suspense> <Invite /></Suspense>,
          },
          {
            path: "commission",
            element: <Suspense> <Commission /></Suspense>,
          }
        ]
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


