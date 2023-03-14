import { Table, Tag, Switch, Image } from 'antd';
import { useState, useEffect } from "react"
import { manageRecharge, manageStatus, ReachageBlock } from "@src/required/index.js"
import { Link } from "react-router-dom"

// 表单数据
const columns = [
  { title: '转账方式', dataIndex: 'cashWay', width: 70, fixed: 'left' },
  { title: '收款人姓名', dataIndex: 'cashName', width: 70 },
  { title: '开户行', dataIndex: "cashBank", width: 100 },
  { title: '说明', dataIndex: 'cashInfo', width: 150 },
  { title: '创建人', dataIndex: ['cashAbout', 'loginName'], width: 100 }
];

// 充值信息管理
export default function RechargeManage({ block }) {
  let [dataArr, setDataArr] = useState([]);

  // 获取初始数据
  useEffect(() => {
    manageRecharge().then((data) => {
      setDataArr(data.data)
    });
    // eslint-disable-next-line
  }, [block]);
  // 修改状态
  const changeSwitch = (val, checked) => {
    manageStatus({ id: val._id, bol: checked })
  }
  // 删除收款信息
  const handlerDelete = async (val, index) => {
    ReachageBlock({ id: val._id })
    dataArr.splice(index, 1)
    setDataArr([...dataArr])
  }

  return (
    <div>
      <Tag color="error" style={{ marginBottom: 10 }}>如需修改: 请删除之后重新提交即可</Tag>
      <Table columns={
        [
          ...columns,
          {
            title: '是否使用', dataIndex: 'cashMake', width: 100,
            render(_, val) { return (<Switch onChange={changeSwitch.bind(null, val)} checkedChildren="允许" unCheckedChildren="禁用" defaultChecked={val.cashMake} />) }
          },
          {
            title: '收款码', dataIndex: 'address', width: 100,
            render(_, val) {
              return <Image width={50} height={50} src={"/api" + val.cashCode} />
            }
          },
          {
            title: '操作',
            dataIndex: 'address2',
            width: 120,
            fixed: 'right',
            render(_, val, index) {
              return (
                <p className='cur'>
                  <Tag onClick={handlerDelete.bind(null, val, index)}>删除</Tag>
                </p>
              )
            }
          },
        ]
      }
        rowKey={(val) => val._id}
        dataSource={dataArr}
        size='middle'
      />
    </div>
  )
}

