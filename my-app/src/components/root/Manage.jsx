import { useState, useEffect } from 'react';
import { manageRegExp } from "@src/hooks/data.js"
import { Input, Space, Button, Drawer, Table, Tag, Form, Select } from 'antd';
import { setManageInfo, getManageInfo, getPageUser, searchUser, removeUser } from "@src/required/index.js"

const { Search } = Input;
const { Option } = Select;
const columns = [
  { title: '用户名', dataIndex: 'loginName', key: '_id', width: 120 },
  { title: '昵称', dataIndex: 'logonNick', key: '_id', width: 120 },
  { title: '注册时间', dataIndex: 'loginTime', key: '_id', ellipsis: true },
  { title: '手机号码', dataIndex: 'loginPhone', key: '_id', },
  { title: '邮箱', dataIndex: 'loginEmail', key: '_id', },
  { title: '权限', dataIndex: ['loginRote', 'roleName'], key: '_id', ellipsis: true },
];
export default function Manage({ roteInfo }) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [dataArr, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  let [len, setLen] = useState(0);
  let [searchBol, setSeaRch] = useState(true);

  const showDrawer = () => { setOpen(true) };
  const onClose = () => { setOpen(false); form.resetFields() };

  // 搜索
  const onSearch = async (value) => {
    if (!value) return;
    let data = await searchUser({ value })
    if (data.code === 3) {
      setData(data.data || [])
      setLen(data.len || 0)
      setCurrent(1);

      setSeaRch(false)
    }
  };

  // 表单提交 添加用户
  const onFinish = async (values) => {
    let data = await setManageInfo(values);
    if (data.code === 3) {
      setData([data.data, ...dataArr])
      setOpen(false);
      // 清空表单
      onClose();
    }
  };
  // 分页获取数据
  const pageChange = async (val) => {
    if (!searchBol) {
      setCurrent(val)
      return
    }
    let data = await getPageUser({ key: val });
    setCurrent(val)
    setData(data.data);
  }

  // 获取角色数据
  useEffect(() => {
    init()
    // eslint-disable-next-line
  }, []);

  const init = () => {
    getManageInfo().then((data) => {
      setData(data.data);
      setLen(data.len)
    });
    setSeaRch(true)
  }
  return (
    <>
      <Space size={10} style={{ marginBottom: "15px" }}>
        <Button type="primary" onClick={showDrawer}>添加用户</Button>
        <Button className='right_name' onClick={init}>默认显示</Button>
        <Search placeholder="用户名/昵称搜索" onSearch={onSearch} style={{ width: 400 }} />
      </Space>
      <Drawer title="添加用户" placement="right" onClose={onClose} open={open}>
        <Form
          form={form}
          layout="vertical"
          initialValues={{ loginName: "", logonNick: "", loginPass: "", loginPhone: "", loginEmail: "", loginRote: "请选择管理权限" }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="用户名" name="loginName" rules={manageRegExp.loginName} help={<p style={{ fontSize: "12px" }}>由3-12位英文字母、数字组成</p>}>
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item label="昵称" name="logonNick" rules={manageRegExp.logonNick} >
            <Input placeholder="请输入昵称" />
          </Form.Item>
          <Form.Item label="密码" name="loginPass" rules={manageRegExp.loginPass}>
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item label="手机号码" name="loginPhone" rules={manageRegExp.loginPhone}>
            <Input addonBefore="+86" />
          </Form.Item>
          <Form.Item label="邮箱" name="loginEmail" rules={manageRegExp.loginEmail}>
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          {/* name="loginRote" */}
          <Form.Item label="角色" name="loginRote" rules={manageRegExp.loginRote}>
            <Select optionFilterProp="value">
              {
                roteInfo.map((item) => {
                  return (
                    <Option value={item._id} key={item._id}>{item.roleName}
                    </Option>
                  )
                })
              }
            </Select>
          </Form.Item>
          <Form.Item >
            <Button type="primary" htmlType="submit">确定</Button>
          </Form.Item>
        </Form>
      </Drawer>
      {/* 表格 */}
      <Table
        size="middle"
        columns={[
          ...columns, {
            title: '操作',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, val, index) => {
              const handlerRemove = async () => {
                removeUser({ id: val._id });
                dataArr.splice(index, 1)
                setData([...dataArr])
              }
              return (
                <>
                  <Tag onClick={handlerRemove} style={{ cursor: 'pointer' }}>
                    删除
                  </Tag>
                </>
              )
            }
          }]}
        dataSource={dataArr}
        rowKey={record => record._id}
        pagination={{ position: ["bottomCenter"], total: len, onChange: pageChange, hideOnSinglePage: true, current }}
      />
    </>
  )
}
