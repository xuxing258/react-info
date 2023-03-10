import { Card, Tabs } from 'antd';
import MemberList from "@src/components/member/MemberList.jsx"
import AddMember from "@src/components/member/AddMember.jsx"
import { useState } from 'react';


export default function Member() {
  const [memberData,setMember] = useState()
  return (
    <>
      <Card title="会员管理" bordered={false} style={{ width: '100%' }}>
        <Tabs defaultActiveKey="1" items={[
          {
            key: '1',
            label: "会员列表",
            children: <MemberList memberData={memberData}></MemberList>,
          },
          {
            key: '2',
            label: `添加会员`,
            children: <AddMember setMember={setMember}></AddMember>,
          },
          {
            key: '3',
            label: `认证管理`,
            children: `123`,
          },
        ]} />
      </Card>
    </>
  )
}
