import { noLogin } from "@src/required/index.js"
import HomeChildAvatar from "@src/components/home/HomeChildAvatar.jsx";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Outlet, useLocation } from "react-router-dom"
import "@src/assets/css/home.sass"
import { arr } from "@src/hooks/data.js";
import { Layout, Menu } from 'antd';

const { Header, Content } = Layout;

// 主页
export default function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation()
  // 导航设置
  const [keyMenu, setkeyMenu] = useState()
  const hanlerSelect = ({ key }) => { navigate(key) }
  // eslint-disable-next-line
  useEffect(() => {
    setkeyMenu(location.pathname)
  }, [location.pathname])

  // 设置免登录
  useEffect(() => {
    noLogin().then((data) => {
      if (data.code === 3) return dispatch({ "type": "useUserInfo/changeInfo", val: data.data });
      if (data.code === 4) return navigate("/");
    })
    // eslint-disable-next-line
  }, []);

  return (
    <div className='home'>
      <div className='layout'>
        {/* 头像登录退出 */}
        <Header className="header">
          <div className="logo" />
          <HomeChildAvatar></HomeChildAvatar>
          <Menu theme="dark" mode="horizontal" selectedKeys={keyMenu} items={arr} onClick={hanlerSelect} />
        </Header>
        {/* 侧边 */}
        <div className='layout-info' style={{ margin: "auto" }}>
          <Content style={{ padding: 15, margin: 0, minHeight: 280, background: "#fff" }} >
            <Outlet />
          </Content>
        </div>
      </div>
    </div>
  )
}


