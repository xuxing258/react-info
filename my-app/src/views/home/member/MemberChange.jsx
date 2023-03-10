import { Button, Form, Input, } from 'antd';
import { Card, Radio } from 'antd';


// 设置样式
const formItemLayout = { labelCol: { span: 4 } };
const formTailLayout = { wrapperCol: { offset: 4 } };


export default function MemberChange() {
  const [form] = Form.useForm();
  const onFinish = (values) => { console.log('Received values of form: ', values) };

  return (
    <>
      <Card
        title="编辑账号信息"
        bordered={false}
      >
        <Form
          form={form} onFinish={onFinish}
          {...formItemLayout}
          size="middle"
          initialValues={{}}
          autoComplete="off"
          style={{ maxWidth: 600 }}
        >
          <Form.Item name="phone" label="手机号码" rules={[{ required: true, message: '请输入手机号码' }]} >
            <Input placeholder='请输入手机号码' />
          </Form.Item>
          <Form.Item name="ID" label="身份证" rules={[{ required: true, message: '请输入身份证号码' }]} >
            <Input placeholder='请输入身份证号码' />
          </Form.Item>
          <Form.Item name="surname" label="姓名" rules={[{ required: true, message: '请输入姓名' }]} >
            <Input placeholder='请输入姓名' />
          </Form.Item>
          <Form.Item name="loginPass" label="登录密码" help="不修改请留空。修改时必填,6-20位">
            <Input.Password placeholder='请输入登录密码' />
          </Form.Item>
          <Form.Item name="payPass" label="支付密码" help="不修改请留空。修改时必填,6-20位">
            <Input.Password placeholder='请输入支付密码' />
          </Form.Item>
          <Form.Item name="loginStatus" label="登录状态" >
            <Radio.Group >
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="msg" label="备注" >
            <Input placeholder='请输入备注信息' />
          </Form.Item>
          <Form.Item name="code" label="设置绑定码">
            <Input placeholder='不知道怎么写' />
          </Form.Item>
          <Form.Item name="proxy" label="代理商" >
            <Input placeholder='不知道怎么写' />
          </Form.Item>
          <Form.Item {...formTailLayout}>
            <Button type="primary" htmlType="submit">
              确定修改
            </Button>
          </Form.Item>
        </Form>
      </Card>

    </>
  );
};