import { Card, Table, } from 'antd';

const columns = [
  {
    title: '代理手机号码',
    dataIndex: 'webPhone',
    fixed: 'left',
    width: 100
  },
  {
    title: '奖励来源',
    dataIndex: 'webName',
    width: 100
  },
  {
    title: '资金管理费用',
    dataIndex: "webName",
    width: 100
  },
  {
    title: '分成比例',
    dataIndex: 'address',
    width: 100
  },
  {
    title: '佣金金额',
    dataIndex: 'address',
    width: 100
  },
  {
    title: '信息',
    dataIndex: 'address',
    width: 100
  },
  {
    title: '创建时间',
    dataIndex: 'address',
    width: 100
  },
];

const data = [];

// 提现功能
export default function Invite() {

  return (
    <div>
      <Card title="佣金分成" bordered={false} >
        <Table columns={columns} dataSource={data} size='middle' />
      </Card>
    </div>
  )
}