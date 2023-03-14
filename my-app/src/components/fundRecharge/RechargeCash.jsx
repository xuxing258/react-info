import { Button, Form, Input, Radio, Upload } from 'antd';
import { setCashWay } from "@src/required/index.js"
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

const setRule = [{ required: true, message: '必须填写' }]

// 充值设置
export default function RechargeCash({ setBlock }) {

  //  表单
  const [form] = Form.useForm();
  const [cashCode, setCashCode] = useState('')

  const onFinish = async (values) => {
    values.cashCode = cashCode;
    let data = await setCashWay(values);
    if (data.code === 1) {
      // 清空
      setBlock(data.data)
      form.resetFields()
      setCashCode("")
    }
  };
  // 上传图片
  const handleChange = (info) => {
    if (info.file.status === 'done') {
      if (info.file.response.code === 3) {
        setCashCode(info.file.response.data)
      }
    }
  };

  return (
    <div>
      <Form
        form={form}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 12 }}
        initialValues={{ cashCode: "", cashMake: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="转账方式" name="cashWay" rules={setRule} >
          <Input placeholder='请输入转账方式: 支付宝,微信,银行卡名称' />
        </Form.Item>
        <Form.Item label="收款账号" name="cashAcc" rules={setRule}>
          <Input placeholder='请输入收款账号: 银行卡, 微信手机号码' />
        </Form.Item>
        <Form.Item label="收款人姓名" name="cashName" rules={setRule}>
          <Input placeholder='请输入收款人姓名' />
        </Form.Item>
        <Form.Item label="开户行" name="cashBank" rules={setRule}>
          <Input placeholder='请输入银行开户行' />
        </Form.Item>
        <Form.Item label="是否使用" name="cashMake">
          <Radio.Group >
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="收款码" help="不是必须填项">
          <Upload
            name='file'
            data={{ cashCode }}
            action="/api/cash/code"
            maxCount={1}
            listType="picture-card"
            showUploadList={false}
            onChange={handleChange}
          >
            {
              cashCode ? <img src={"/api" + cashCode} alt="avatar" style={{ width: '90px', height: "90px" }} /> : <PlusOutlined />
            }
          </Upload>
        </Form.Item>
        <Form.Item label="备注" name="cashInfo">
          <Input placeholder='备注' />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 3 }}>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
