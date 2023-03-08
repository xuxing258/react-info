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
          label: AndroidOutlined,
          info: "角色管理",
          children: <Rote setRoteInfo={setRoteInfo} />,
        },
        {
          label: AppleOutlined,
          info: "用户管理",
          children: <Manage roteInfo={roteInfo} />,
        }
      ].map((Icon, i) => {
        const id = String(i + 1);
        return {
          // eslint-disable-next-line 
          label: (<span> <Icon.label />{Icon.info}  </span>),
          key: id,
          children: Icon.children,
        };
      })
    }
    />
  )
}
