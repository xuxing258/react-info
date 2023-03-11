import { Layout, Menu } from 'antd';
import { arr, useSideData } from "@src/hooks/data.js";
import HomeChildAvatar from "./HomeChildAvatar.jsx";
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


const { Header, Content, Sider } = Layout;
export default function HomeChild() {
  let sideMenu = useSideData();
  const navigate = useNavigate();
  const location = useLocation()
  // 导航设置
  let val = useSelector((state) => state.useOther.menuSelect);
  const [keyMenu, setkeyMenu] = useState()
  const hanlerSelect = ({ key }) => { setkeyMenu(key); navigate(key) }
  useEffect(() => {
    // 当仓库数据更改并且和跳转地址一直时,进行修改导航显示,  初始化时不相同不会走进true中执行, 后面没有触发仓库数据也不会进入true中
    // 解决初始化时导航冲突
    if (location.pathname === val) { setkeyMenu(val); console.log(1); }
    // eslint-disable-next-line
  }, [val])

  return (
    <div className='layout'>
      {/* 头像登录退出 */}
      <Header className="header">
        <div className="logo" />
        <HomeChildAvatar></HomeChildAvatar>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={location.pathname} selectedKeys={keyMenu} items={arr} onClick={hanlerSelect} />
      </Header>
      {/* 侧边 */}
      <div className='layout-info'>
        <Sider width={200} style={{ height: "100%", backgroundColor: "#00152A" }} theme="dark">
          <Menu mode="inline" defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0, }}
            theme="dark"
            items={sideMenu}
          />
        </Sider>
        {/* 主体内容 */}
        <div className='wrap'>
          <Content style={{ padding: 15, margin: 0, minHeight: 280, background: "#fff" }} >
            <Outlet />
          </Content>
        </div>
      </div>
    </div>
  )
}
