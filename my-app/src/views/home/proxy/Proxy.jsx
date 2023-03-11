import { Card, Table, Tag, Button, Space, Input, Switch, Modal } from 'antd';
import { getProxyInfo, getSearchProxy, proxyMamber } from "@src/required/index.js"
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux';

const { Search } = Input
const columns = [
  {
    title: '手机号码',
    dataIndex: 'webPhone',
    fixed: 'left',
    width: 100
  },
  {
    title: '姓名',
    dataIndex: 'webName',
    width: 100
  },
  {
    title: '代理联系人',
    dataIndex: ["webCreate", "loginName"],
    width: 100
  },
  {
    title: '名下会员数',
    dataIndex: 'address',
    width: 100
  },
  {
    title: '注册时间',
    dataIndex: 'webTime',
    width: 160
  },
];

export default function Proxy() {
  // 表单数据
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  // 弹出框
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 搜索代理
  const onSearch = async (val) => {
    let data = await getSearchProxy({ val });
    setData(data.data)
  }

  // 设置代理状态
  const changeProxy = (val, webProxyBol) => {
    proxyMamber({ id: val._id, bol: webProxyBol })
  }
  // 初始化
  useEffect(() => {
    getProxyInfo().then((data) => {
      setData(data.data)
    })
    // eslint-disable-next-line
  }, [])

  return (
    <Card title="代理商列表" bordered={false}   >
      <Space>
        <Button onClick={() => { dispatch({ type: "useOther/changeMenuSelect", val: "/home/member" }) }}><Link to="/home/member">添加代理会员</Link></Button>
        <Search
          placeholder="手机号码/姓名搜索"
          allowClear
          onSearch={onSearch}
          style={{ width: 300 }}
        />
      </Space>
      <Table
        style={{ marginTop: 15 }}
        columns={[
          ...columns,
          {
            title: '允许代理', dataIndex: 'address3', key: '5', width: 80,
            render(_, val) { return (<Switch onChange={changeProxy.bind(null, val)} checkedChildren="是" unCheckedChildren="否" defaultChecked={val.webProxyBol} />) }
          },
          {
            title: '操作',
            dataIndex: 'address2',
            key: '7',
            width: 120,
            fixed: 'right',
            render(_, val, index) {
              return (
                <Tag className='cur' onClick={showModal}> 编辑</Tag>
              )
            }
          },
        ]}
        dataSource={data}
        rowKey={(val) => val._id}
      />
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </Card>
  )
}
