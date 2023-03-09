import React, { useEffect, useState } from 'react'
import { Table, Switch, Tag } from 'antd';
import { getMamber } from "@src/required/index.js"

const columns = [
  {
    title: 'ID',
    dataIndex: '_id',
    key: 'name',
    fixed: 'left',
    width: 170
  },
  {
    title: '手机号码',
    dataIndex: 'webPhone',
    key: 'age',
    width: 100
  },
  {
    title: '姓名',
    dataIndex: 'webName',
    key: '1',
    width: 100
  },
  {
    title: '身份证',
    dataIndex: 'address',
    key: '2',
    width: 200
  },
  {
    title: '注册时间',
    dataIndex: 'webTime',
    key: '3',
    width: 120

  },
  {
    title: '登录时间',
    dataIndex: 'address',
    key: '4',
    width: 150
  },
  {
    title: '来源',
    dataIndex: 'address',
    key: '5',
    width: 150
  },
  {
    title: "备注",
    dataIndex: 'address',
    key: '6',
    width: 150
  },
  {
    title: '账号状态',
    dataIndex: 'address',
    key: '5',
    width: 80,
    render(_, val) {
      return (<Switch checkedChildren="正常" unCheckedChildren="禁用" defaultChecked={val.webStatusBol} />)
    }
  },
  {
    title: '操作',
    dataIndex: 'address',
    key: '7',
    width: 200,
    fixed: 'right',
    render(_, val) {
      return (
        <p>
          <Tag>删除</Tag>
          <Tag>编辑</Tag>
          <Tag>重置支付密码</Tag>
        </p>
      )
    }
  },
];

// 会员列表
export default function MemberList() {
  let [da, setData] = useState([])

  // 获取初始数据
  useEffect(() => {
    getMamber().then((data) => {
      setData(data.data)
    })
    // eslint-disable-next-line
  }, [])
  return (
    <div >
      <Table
        columns={columns}
        dataSource={da}
        scroll={{ y: "57vh", x: 1800 }}
        rowKey={(record) => record._id}
        pagination={{ position: ["bottomCenter"], hideOnSinglePage: true, }}
      />
    </div>
  )
};


