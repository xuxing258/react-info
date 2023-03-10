import { Avatar } from "antd"
import { UserOutlined, MenuOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { Popover } from 'antd';


export default function HomeChildAvatar() {
  const userInfo = useSelector(state => state.useUserInfo.userInfo)
  const navigate = useNavigate();

  // 退出登录
  const handlerExit = () => {
    localStorage.removeItem("token");
    navigate("/")
  };

  return (
    <div className='user' >
      <span style={{ color: "#fff" }}>{userInfo?.logonNick}</span> &nbsp;
      <Popover content={
        <>
          <p style={{cursor:"pointer"}} onClick={() => navigate("/home/person")}>个人设置  <MenuOutlined /></p>
          <p style={{cursor:"pointer"}} onClick={handlerExit}>退出账户 <ArrowRightOutlined /></p>
        </>
      }
        trigger="click"
      >
        <Avatar size={40} icon={<UserOutlined />} src={"/api" + userInfo?.LoginImg}  />
      </Popover>
    </div >
  )
}
