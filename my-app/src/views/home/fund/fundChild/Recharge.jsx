import { Tabs, Card } from 'antd';
import RechargeCash from "@src/components/fundRecharge/RechargeCash.jsx"

// 充值功能
export default function Recharge() {

  return (
    <Card>
      <Tabs defaultActiveKey="1" items={[
        { key: '1', label: `充值设置`, children: <RechargeCash></RechargeCash> },
        { key: '2', label: `充值管理`, children: `Content of Tab Pane 2` }
      ]}
      />
    </Card>
  )
}
