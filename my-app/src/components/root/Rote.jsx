import { useEffect, useState } from 'react';
import { Form, Input, Tree, Button, Drawer, Table, Tag, Select } from 'antd';
import { arr } from "@src/hooks/data.js"
import { createRote, getRoteInfo, rmoveRoteInfo } from "@src/required/index.js"
const { Option } = Select
// 设置表头
let dataInfo = [
  {
    title: '角色',
    dataIndex: 'roleName',
    key: 'age',
    width: 120,
  },
  {
    title: '权限',
    dataIndex: 'roleGrade',
    key: 'roleGrade',
    width: 100,
  },
  {
    title: '创建时间',
    dataIndex: 'roleTime',
    key: 'address',
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'roleInfo',
    key: 'msg',
  },
]


export default function Rote({ setRoteInfo }) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [treeKeyArr, setTreeKeyArr] = useState([]);
  const [accountArr, setAccountArr] = useState([]);
  const [showtable, setShowTable] = useState([])
  const [tableObj] = useState({ roteName: "", info: "", grade: "一" })
  const [id, setID] = useState({ id: "", index: "" })

  // 隐藏显示
  const showDrawer = () => { setOpen(true) };
  const onClose = () => { setOpen(false); form.resetFields(); setTreeKeyArr([]) };

  // 勾选获取
  const onCheck = (checkedKeys, info) => {
    // 勾选input
    setTreeKeyArr([...checkedKeys])
    // 获取数据
    setAccountArr(info.checkedNodes)
  };

  // 表单数据
  const onFinish = async (values) => {
    let data = await createRote({ values, treeKeyArr, accountArr, id: id.id });
    if (data.code === 4) {
      showtable.splice(id.index, 1, data.data)
      setShowTable([...showtable]);
    }
    if (data.code === 3) {
      setShowTable([data.data, ...showtable]);
    }
    // 清空tree树结构
    setTreeKeyArr([])
    // 清空表单
    form.resetFields();
    // 关闭弹出
    setOpen(false)
  }

  // 获取角色数据
  useEffect(() => {
    getRoteInfo().then((data) => {
      setShowTable(data.data)
      setRoteInfo(data.data)
    })
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Button type="primary" onClick={showDrawer} style={{ marginBottom: "15px" }}>新增角色</Button>
      <Drawer title="新增角色" placement="right" onClose={onClose} open={open}>
        <Form
          form={form}
          layout="vertical"
          name="basic"
          style={{ maxWidth: 600, }}
          initialValues={tableObj}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="角色名称" name="roteName" rules={[{ required: true, message: '必须输入', }]} >
            <Input placeholder='请角色名称' />
          </Form.Item>
          <Form.Item label="角色描述" name="info" rules={[{ required: true, message: '描述角色工作' }]}>
            <Input placeholder='请输入角色描述' />
          </Form.Item>
          <Form.Item label="角色等级或代理用户" name="grade" rules={[{ required: true, message: '描述角色工作' }]} >
            <Select>
              <Option value={1}>一级权限</Option>
              <Option value={2}>二级权限</Option>
              <Option value={3}>用户代理权限</Option>
            </Select>
          </Form.Item>
          <Form.Item label="角色权限" >
            {/*  checkStrictly={true} */}
            <Tree checkable treeData={arr} onCheck={onCheck} checkedKeys={treeKeyArr} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8 }}>
            <Button type="primary" htmlType="submit">确定</Button>
          </Form.Item>
        </Form>
      </Drawer>
      {/* 表格 */}
      <Table size="middle" columns={[
        ...dataInfo,
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          render: (_, record, index) => {
            // 删除
            const handlerDelete = async () => {
              showtable.splice(index, 1)
              setShowTable([...showtable])
              rmoveRoteInfo({ id: record._id })
            }
            // 修改
            const handlerChange = async () => {
              setTreeKeyArr(record.roleKeyArr);
              form.setFieldsValue({ roteName: record.roleName, info: record.roleInfo, grade: record.roleGrade });
              setID({ id: record._id, index: index })
              setOpen(true);
            };
            return (
              <>
                <Tag style={{ cursor: 'pointer' }} onClick={handlerDelete}>删除</Tag>
                <Tag style={{ cursor: 'pointer' }} onClick={handlerChange}>修改</Tag>
              </>
            )
          },
        }
      ]} dataSource={showtable} rowKey={(record) => record._id} pagination={{ position: ["bottomCenter"], hideOnSinglePage: true }}
      />
    </>
  )
}
