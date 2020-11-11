import React, { useState, useEffect, useCallback } from 'react';
import {
  Row,
  Col,
  Input,
  InputNumber,
} from 'antd';
import { strToObj, objToStr } from './t';

export default ({
  value,
  onChange,
}) => {
  const [currentValue, setCurrentValue] = useState({
    color: '#000',
    offsetX: 0,
    offsetY: 0,
    blur: 0,
  });
  useEffect(
    () => {
      if (value) {
        if (typeof value === 'string') {
          setCurrentValue(strToObj(value));
        } else {
          setCurrentValue(value);
        }
      } else {
        setCurrentValue({
          color: '#000',
          offsetX: 0,
          offsetY: 0,
          blur: 0,
        });
      }
    },
    [value],
  );
  const handleChange = useCallback(
    (k, v) => {
      onChange(objToStr({
        ...currentValue,
        [k]: v
      }));
    },
    [currentValue],
  );

  return (
    <Row gutter={5}>
      <Col span={6}>
        <div style={{textAlign: 'center'}}>
          <Input type="color" style={{width: '100%'}} value={currentValue.color} onChange={e => {
            handleChange('color', e.target.value);
          }} />
          <span>Color</span>
        </div>
      </Col>
      <Col span={6}>
        <div style={{textAlign: 'center'}}>
          <InputNumber style={{width: '100%'}} value={currentValue.offsetX} onChange={e => {
            handleChange('offsetX', e);
          }} />
          <span>X</span>
        </div>
      </Col>
      <Col span={6}>
        <div style={{textAlign: 'center'}}>
          <InputNumber style={{width: '100%'}} value={currentValue.offsetY} onChange={e => {
            handleChange('offsetY', e);
          }} />
          <span>Y</span>
        </div>
      </Col>
      <Col span={6}>
        <div style={{textAlign: 'center'}}>
          <InputNumber style={{width: '100%'}} value={currentValue.blur} onChange={e => {
            handleChange('blur', e);
          }} />
          <span>Blur</span>
        </div>
      </Col>
    </Row>
  )
}