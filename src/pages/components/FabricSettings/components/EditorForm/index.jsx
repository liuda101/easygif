import React, { useEffect } from 'react';
import {
  Form,
  Input,
  Select,
  Slider,
  Button,
  Space,
  Radio,
  InputNumber,
  Row,
  Col,
} from 'antd';
import ShadowInput from './ShadowInput';

const FormItemMap = {
  input: Input,
  slider: Slider,
  select: Select,
  shadow: ShadowInput,
  radioGroup: Radio.Group,
  inputNumber: InputNumber,
};

export default ({
  items,
  initialValues = {},
  framesSelector,
  onChange,
  onClose,
  onDelete,
}) => {
  const [form] = Form.useForm();
  useEffect(
    () => {
      form.setFieldsValue(initialValues);
    },
    [initialValues],
  );

  return (
    <Form
      onValuesChange={v => {
        onChange(v);
      }}
      labelCol={{span: 4}}
      wrapperCol={{span: 18}}
      labelAlign="left"
      form={form}
    >
      {
        items.map(item => {
          const ItemNode = FormItemMap[item.type];
          return (
            <Form.Item
              key={item.key}
              name={item.key}
              label={item.label}
            >
              <ItemNode {...item.props} />
            </Form.Item>
          )
        })
      }
      {framesSelector}
      <div style={{margin: '70px 0 30px', textAlign: 'center'}}>
        <Space>
          <Button onClick={onClose}>Close</Button>
          <Button type="danger" onClick={onDelete}>Delete</Button>
        </Space>
      </div>
    </Form>
  )
}