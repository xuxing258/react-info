import "@src/assets/css/login.sass"
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { requireLogin } from "@src/required"
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const onFinish = async (values) => {
    let data = await requireLogin(values)
    if (data.code === 3) {
      localStorage.setItem("token", data.token)
      dispatch({ "type": "useUserInfo/changeInfo", val: data.data })
      navigate("/home/child");
    }
  };
  return (
    <div className="login">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item>
          <h2 className="title">嘎嘎嘎管理</h2>
        </Form.Item>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '必须填写',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入账号" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '必须填写',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="请输入密码"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};