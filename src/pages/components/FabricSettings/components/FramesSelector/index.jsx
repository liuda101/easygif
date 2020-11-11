import React from 'react';
import { Row, Col, Slider } from 'antd';

export default ({
  value,
  max,
  onChange,
}) => {
  return (
    <Row>
      <Col span={4}>
        Frames:
      </Col>
      <Col span={18}>
        <Slider
          range
          min={1}
          max={max}
          value={value}
          onChange={e => {
            onChange(e);
          }}
        />
      </Col>
    </Row>
  )
}