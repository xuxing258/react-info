// 添加会员  用于前端登录账号与关联
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Radio, Form, Input } from 'antd';
import { manageRegExp } from "@src/hooks/data.js"
import { addMamber } from "@src/required/index.js"

export default function AddMember() {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    let data = await addMamber(values);
    if (data.code === 1) {
      form.resetFields()
    }
  };
  return (
    <Form
      form={form}
      name="normal_login"
      className="login-form"
      initialValues={{ username: '', password: "123123", remember: false }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item name="loginPhone" label="手机号码" rules={manageRegExp.loginPhone} >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请填写手机号码" />
      </Form.Item>
      <Form.Item name="password" label="密码" rules={[{ required: true, message: '必填', }]} help="默认密码: 123123">
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" />
      </Form.Item>
      <Form.Item name="remember" label="设置代理" >
        <Radio.Group >
          <Radio value={true}>是</Radio>
          <Radio value={false}>否</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">  提交 </Button>
      </Form.Item>
    </Form>
  );
};