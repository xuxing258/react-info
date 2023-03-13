import { useNavigate, Outlet, } from "react-router-dom"
import { Menu } from 'antd';
import { useState } from "react"
import { useFundSideData } from "@src/hooks/data.js";

export default function Fund() {
  const navigate = useNavigate();
  const [keyMenu, setkeyMenu] = useState()
  const hanlerSelect = ({ key }) => { navigate(key); setkeyMenu(key) }
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: 200 }} >
        <Menu mode="inline" defaultSelectedKeys="/home/proxy/child" selectedKeys={keyMenu} theme="light" items={useFundSideData} onClick={hanlerSelect} />
      </div>
      <div style={{ flex: 1 }}>
        <Outlet></Outlet>
      </div>
    </div>
  )
}
