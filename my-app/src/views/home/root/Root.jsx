import React, { useState } from 'react'
import { Tabs } from 'antd';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import Rote from "@src/components/root/Rote.jsx"
import Manage from "@src/components/root/Manage.jsx"


// 设置角色
export default function Root() {
  let [roteInfo, setRoteInfo] = useState([])
  return (
    <Tabs items={
      [
        {
          label: <span> <AndroidOutlined />角色管理</span>,
          key: "1",
          children: <Rote setRoteInfo={setRoteInfo} />,
        },
        {
          label: <span> <AppleOutlined />用户管理</span>,
          key: "2",
          children: <Manage roteInfo={roteInfo} />,
        }
      ]
    }
    />
  )
}
