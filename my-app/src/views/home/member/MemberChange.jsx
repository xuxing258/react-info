import { Button, Form, Input, Card, Radio } from 'antd';
import { useLocation, useNavigate } from "react-router-dom"
import { changeMamberInfo } from "@src/required/index.js"
import { ArrowLeftOutlined } from '@ant-design/icons';
// 设置样式
const formItemLayout = { labelCol: { span: 4 } };
const formTailLayout = { wrapperCol: { offset: 4 } };


// 编辑会员信息
export default function MemberChange() {
  const [form] = Form.useForm();
  const { state: { val } } = useLocation()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    await changeMamberInfo({ ...values, id: val._id });
    navigate("/home/member")
  };

  return (
    <>
      <Card title={
        <>
          <span className='cur' onClick={() => navigate(-1)}><ArrowLeftOutlined /></span> &nbsp;
          <span>编辑账号信息</span>
        </>}
        bordered={false}
      >
        <Form form={form} onFinish={onFinish}  {...formItemLayout} size="middle" initialValues={val} autoComplete="off" style={{ maxWidth: 600 }}>
          <Form.Item name="webPhone" label="手机号码" rules={[{ required: true, message: '请输入手机号码' }]} >
            <Input placeholder='请输入手机号码' />
          </Form.Item>
          <Form.Item name="webID" label="身份证" rules={[{ required: true, message: '请输入身份证号码' }]} >
            <Input placeholder='请输入身份证号码' />
          </Form.Item>
          <Form.Item name="webName" label="姓名" rules={[{ required: true, message: '请输入姓名' }]} >
            <Input placeholder='请输入姓名' />
          </Form.Item>
          <Form.Item name="webPass" label="登录密码" help="不修改请留空。修改时必填,6-20位">
            <Input.Password placeholder='请输入登录密码' />
          </Form.Item>
          <Form.Item name="payPass" label="支付密码" help="不修改请留空。修改时必填,6-20位">
            <Input.Password placeholder='请输入支付密码' />
          </Form.Item>
          <Form.Item name="webStatusBol" label="登录状态" >
            <Radio.Group >
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="webProxyBol" label="是否代理" >
            <Radio.Group >
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="webInfo" label="备注" >
            <Input placeholder='请输入备注信息' />
          </Form.Item>
          <Form.Item name="webCode" label="设置绑定码">
            <Input placeholder='不知道怎么写' />
          </Form.Item>
          <Form.Item name="webProxyName" label="代理商" >
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