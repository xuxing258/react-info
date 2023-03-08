import React, { useEffect } from 'react'
import { useLocation } from "react-router-dom"
import { Breadcrumb, Card, Button, Form, Input, Upload } from 'antd';
import { chagnePerson } from "@src/required/index.js"
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';

export default function Person() {
  let { state } = useLocation();
  let userInfo = useSelector(state => state.useUserInfo.userInfo)
  const dispatch = useDispatch()
  const [form] = Form.useForm();

  // 刷新重置
  useEffect(() => {
    form.setFieldsValue(userInfo)
    // eslint-disable-next-line
  }, [userInfo])

  // 提交修改
  const finish = async (value) => {
    value.loginName = userInfo.loginName
    let data = await chagnePerson(value);
    if (data.code === 1) {
      localStorage.setItem("token", data.token)
      dispatch({ "type": "useUserInfo/changeInfo", val: data.data })
    }
  }
  // 上传图片
  const handleChange = (info) => {
    if (info.file.status === 'done') {
      if (info.file.response.code === 3) {
        localStorage.setItem("token", info.file.response.token)
        dispatch({ "type": "useUserInfo/changeInfo", val: info.file.response.data })
      }
    }
  };
  return (
    <div className='person'>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>{state?.root}</Breadcrumb.Item>
        <Breadcrumb.Item>{state?.two}</Breadcrumb.Item>
      </Breadcrumb>
      <Card title="个人设置" bordered={false} headStyle={{ backgroundColor: "#eee" }}>
        <Form layout="vertical" form={form} style={{ maxWidth: 600, }} size="small" initialValues={userInfo} onFinish={finish} >
          <Form.Item label="用户名">
            {userInfo?.loginName}
            <p style={{ fontSize: "12px", color: "#eee" }}>不可修改</p>
          </Form.Item>
          <Form.Item label="昵称" name="logonNick">
            <Input placeholder="可以是中文" />
          </Form.Item>
          <Form.Item label="邮箱" name="loginEmail">
            <Input placeholder="修改邮箱" />
          </Form.Item>
          <Form.Item label="密码" name="loginPass" >
            <Input placeholder="必填,6-20位" type='password' />
          </Form.Item>
          <Form.Item label="手机号码" name="loginPhone">
            <Input />
          </Form.Item>
          <Form.Item label="头像">
            <div>
              {userInfo?.LoginImg ? (<img src={"/api" + userInfo?.LoginImg} alt="avatar" style={{ width: '50px', height: "50px" }} />) : ""}
            </div>
            <Upload
              name="file"
              data={{ id: userInfo?._id }}
              maxCount={1}
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              action="/api/root/avatar"
              onChange={handleChange}
            >
              <PlusOutlined ></PlusOutlined >
            </Upload>
          </Form.Item>
          <Form.Item >
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </Card>
    </div >
  )
}
