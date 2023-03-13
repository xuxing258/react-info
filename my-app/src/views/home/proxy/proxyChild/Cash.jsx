import { Card, Table, } from 'antd';

const columns = [
  {
    title: '代理手机号码',
    dataIndex: 'webPhone',
    fixed: 'left',
    width: 100
  },
  {
    title: '提现金额',
    dataIndex: 'webName',
    width: 100
  },
  {
    title: '手续费',
    dataIndex: "webName",
    width: 100
  },
  {
    title: '申请时间',
    dataIndex: 'address',
    width: 100
  },
];

const data = [];

// 提现功能
export default function Cash() {

  return (
    <div>
      <Card title="提现记录" bordered={false} >
        <Table columns={columns} dataSource={data} size='middle' />
      </Card>
    </div>
  )
}