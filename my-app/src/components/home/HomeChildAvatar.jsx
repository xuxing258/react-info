import React, { useCallback, useEffect, useState } from 'react'
import { Avatar } from "antd"
import { UserOutlined, HomeOutlined, LeftOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"

export default function HomeChildAvatar() {
  const userInfo = useSelector(state => state.useUserInfo.userInfo)
  const navigate = useNavigate();

  let [bol, setBol] = useState(false)
  const handlerChagne = useCallback((ev) => {
    ev.stopPropagation()
    setBol(!bol);
  }, [bol])

  // eslint-disable-next-line
  useEffect(() => {
    document.documentElement.onclick = () => { setBol(false) };
  }, [bol]);

  // 退出登录
  const handlerExit = () => {
    localStorage.removeItem("token");
    navigate("/")
  };


  return (
    <div className='user' onClick={(ev) => { ev.stopPropagation() }}>
      <Avatar size={40} icon={<UserOutlined />} src={"/api" + userInfo?.LoginImg} onClick={handlerChagne} />
      <div className='promo' style={{ display: bol ? "block" : "none" }}>
        <p onClick={() => navigate("/home/person", { state: { root: "首页", two: "个人设置" } })}>个人设置  <HomeOutlined /></p>
        <p onClick={handlerExit}>退出账户 <LeftOutlined /></p>
      </div>
    </div >
  )
}
