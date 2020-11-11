import React from 'react';
import {
  Form,
  Input,
  Select,
  Slider,
  Button,
  Space,
} from 'antd';

const FormItemMap = {
  input: Input,
  slider: Slider,
};

export default ({
  items,
  initialValues = {},
  onChange,
  onClose,
  onDelete,
}) => {
  return (
    <Form
      initialValues={initialValues}
      onValuesChange={v => {
        onChange(v);
      }}
      labelCol={{span: 4}}
      wrapperCol={{span: 18}}
      labelAlign="left"
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
      <div style={{margin: '70px 0 30px', textAlign: 'center'}}>
        <Space>
          <Button onClick={onClose}>Close</Button>
          <Button type="danger" onClick={onDelete}>Delete</Button>
        </Space>
      </div>
    </Form>
  )
}