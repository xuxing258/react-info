import { useProxtSideData } from "@src/hooks/data.js";
import { useNavigate, Outlet, } from "react-router-dom"
import { Menu } from 'antd';
import { useState } from "react"

export default function Proxy() {
  const navigate = useNavigate();
  const [keyMenu, setkeyMenu] = useState()
  // 跳转路由
  const hanlerSelect = ({ key }) => { navigate(key); setkeyMenu(key) }
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: 200 }} >
        <Menu mode="inline" defaultSelectedKeys="/home/proxy/child" selectedKeys={keyMenu} theme="light" items={useProxtSideData} onClick={hanlerSelect} />
      </div>
      <div style={{ flex: 1 }}>
        <Outlet></Outlet>
      </div>
    </div >
  )
}
