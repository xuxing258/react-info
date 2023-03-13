import { Card, Table, } from 'antd';

const columns = [
  {
    title: '邀请人手机号码',
    dataIndex: 'webPhone',
    fixed: 'left',
    width: 100
  },
  {
    title: '被邀请人手机号码',
    dataIndex: 'webName',
    width: 100
  },
  {
    title: '姓名',
    dataIndex: "webName",
    width: 100
  },
  {
    title: '注册时间',
    dataIndex: 'address',
    width: 100
  },
];

const data = [];

// 提现功能
export default function Invite() {

  return (
    <div>
      <Card title="邀请记录" bordered={false} >
        <Table columns={columns} dataSource={data} size='middle' />
      </Card>
    </div>
  )
}