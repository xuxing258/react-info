import { Link } from "react-router-dom"
import { Card, Table, Tag, Button, Space, Input, Switch, Modal, Form } from 'antd';
import { getProxyInfo, getSearchProxy, proxyMamber, setProxyRebates } from "@src/required/index.js"
import { useEffect, useState } from 'react';

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
  {
    title: '代理比例',
    dataIndex: 'webRebates',
    width: 160
  },
];

export default function ProxyChild() {
  const [form] = Form.useForm();
  const [mongoID, setMongoID] = useState(0);

  // 表单数据
  const [data, setData] = useState([]);
  // 弹出框
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (val) => {
    setMongoID(val._id)
    setIsModalOpen(true)
  };
  // 设置比例分成,暂时未设置完成,  后端数据不止如果设置
  const handleOk = async () => {
    await setProxyRebates({ webRebates: form.getFieldValue("webRebates"), mongoID })
    setIsModalOpen(false)
    form.resetFields()
  };
  // 弹出框清空
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields()
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
    <Card title="代理商列表" bordered={false} style={{ flex: 1 }}  >
      <Space>
        <Button ><Link to="/home/member">添加代理会员</Link></Button>
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
                <Tag className='cur' onClick={showModal.bind(null, val)}>设置比例</Tag>
              )
            }
          },
        ]}
        dataSource={data}
        size="middle"
        rowKey={(val) => val._id}
        pagination={{ position: ["bottomCenter"], hideOnSinglePage: true }}
      />
      <Modal title="编辑代理信息" centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel} cancelText="取消" okText="确定">
        <Form form={form}>
          <Form.Item label="返佣比例" name="webRebates">
            <Input placeholder="请输入返佣比例" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  )
}
