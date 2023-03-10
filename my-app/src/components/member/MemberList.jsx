import React, { useEffect, useState } from 'react'
import { Table, Switch, Tag, Input, Space, Select, Button } from 'antd';
import { getMamber, removeMamber, statusMamber, getPangMamber, getSearch } from "@src/required/index.js"
import { Link } from "react-router-dom"

const { Search } = Input;
const { Option } = Select
const columns = [
  {
    title: '手机号码',
    dataIndex: 'webPhone',
    key: 'age',
    fixed: 'left',
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
];

// 会员列表
export default function MemberList({ memberData }) {
  let [da, setData] = useState([]);
  let [len, setLen] = useState(0);
  let [select, setSelect] = useState(1)
  let [searchBol, setSeaRch] = useState(true)
  const [current, setCurrent] = useState(1);

  // 获取初始数据
  useEffect(() => {
    init();
    // eslint-disable-next-line
  }, [memberData]);

  const init = () => {
    getMamber().then((data) => {
      setData(data.data)
      setLen(data.len)
    });
    setSeaRch(true)
  }

  // 功能设置
  const handlerDelete = async (val, index) => {
    await removeMamber({ id: val._id })
    da.splice(index, 1)
    setData([...da])
  }
  // 状态
  const changeSwitch = (val, checked) => {
    statusMamber({ id: val._id, bol: checked })
  }

  // 分页获取数据
  const pageChange = async (val) => {
    if (!searchBol) {
      setCurrent(val)
      return
    }
    let data = await getPangMamber({ key: val });
    setCurrent(val)
    setData(data.data);
  }
  // 搜索
  const onSearch = async (val) => {
    if (!val) return;
    let data = await getSearch({ val, select })
    if (data.code === 3) {
      setData(data.data);
      setLen(data.len);
      setCurrent(1)
      // 设置false 为搜索状态
      setSeaRch(false)
    }
  }
  return (
    <div >
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <div>
          <Select defaultValue={select} style={{ width: 120 }} onSelect={(key) => { setSelect(key) }}>
            <Option value={1}>手机号码</Option>
            <Option value={2}>身份证</Option>
            <Option value={3}>姓名</Option>
          </Select>
          &nbsp;
          <Search
            placeholder="请选择: 手机号码/姓名/身份证搜索"
            allowClear
            onSearch={onSearch}
            style={{ width: 400 }}
          />
          &nbsp;
          <Button className='right_name' onClick={init}>默认显示</Button>
        </div>
        <Table
          columns={[
            ...columns,
            {
              title: '账号状态', dataIndex: 'address', key: '5', width: 80,
              render(_, val) { return (<Switch onChange={changeSwitch.bind(null, val)} checkedChildren="正常" unCheckedChildren="禁用" defaultChecked={val.webStatusBol} />) }
            },
            {
              title: '操作',
              dataIndex: 'address',
              key: '7',
              width: 200,
              fixed: 'right',
              render(_, val, index) {
                return (
                  <p className='cur'>
                    <Tag onClick={handlerDelete.bind(null, val, index)}>删除</Tag>
                    <Tag>  <Link to="/home/memchange">编辑</Link> </Tag>
                    <Tag>重置支付密码</Tag>
                  </p>
                )
              }
            },
          ]}
          dataSource={da}
          scroll={{ y: "55vh", x: 1800 }}
          rowKey={(record) => record._id}
          pagination={{ position: ["bottomCenter"], total: len, onChange: pageChange, hideOnSinglePage: true, current }}
        />
      </Space>
    </div>
  )
};


