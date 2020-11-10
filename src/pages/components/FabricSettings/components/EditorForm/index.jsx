import React from 'react';
import {
  Form,
  Input,
  Select,
  Slider,
} from 'antd';

const FormItemMap = {
  input: Input,
  slider: Slider,
};

export default ({
  items,
  initialValues = {},
  onChange,
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
    </Form>
  )
}