import { Card, Table, } from 'antd';

const columns = [
  { title: '手机号码', dataIndex: 'webPhone', fixed: 'left', width: 100 },
  { title: '姓名', dataIndex: 'webName', width: 100 },
  { title: '可用资金', dataIndex: "webName", width: 100 },
  { title: '冻结金额', dataIndex: 'address', width: 100 },
  { title: '操盘总额', dataIndex: 'address', width: 100 },
  { title: '保证金总额', dataIndex: 'address', width: 100 },
];

const data = [];

// 提现功能
export default function FunChild() {

  return (
    <div>
      <Card title="提现记录" bordered={false} >
        <Table columns={columns} dataSource={data} size='middle' />
      </Card>
    </div>
  )
}