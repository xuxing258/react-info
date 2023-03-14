import { Tabs, Card } from 'antd';
import { useState } from "react"
import RechargeCash from "@src/components/fundRecharge/RechargeCash.jsx"
import RechargeManage from "@src/components/fundRecharge/RechargeManage.jsx"


// 充值功能
export default function Recharge() {
  let [block, setBlock] = useState([])

  return (
    <Card>
      <Tabs defaultActiveKey="1" items={[
        { key: '1', label: `充值设置`, children: <RechargeCash setBlock={setBlock}></RechargeCash> },
        { key: '2', label: `充值管理`, children: <RechargeManage block={block} ></RechargeManage> }
      ]}
      />
    </Card>
  )
}
