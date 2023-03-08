import { Layout, Menu } from 'antd';
import { useNavData, useSideData } from "@src/hooks/data.js";
import HomeChildAvatar from "./HomeChildAvatar.jsx";
import { Outlet } from 'react-router-dom';
import { useNavigate } from "react-router-dom"


const { Header, Content, Sider } = Layout;
export default function HomeChild() {
  let caseMenu = useNavData();
  let sideMenu = useSideData();
  const navigate = useNavigate();
  const hanlerSelect = ({ key }) => { navigate(key) }

  return (
    <div className='layout'>
      {/* 头像登录退出 */}
      <Header className="header">
        <div className="logo" />
        <HomeChildAvatar></HomeChildAvatar>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0-1']} items={caseMenu} onClick={hanlerSelect} />
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
        <div style={{ width: "100%" }}>
          <Content style={{ padding: 15, margin: 0, minHeight: 280, background: "#fff" }} >
            <Outlet />
          </Content>
        </div>
      </div>
    </div>
  )
}
