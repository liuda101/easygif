import React, { useState, useEffect } from 'react';
import { Drawer } from 'antd';
import { useSelector, useDispatch } from 'umi';
import EditorForm from './components/EditorForm';
import fontConfig from './config/font';

const EditorConfig = {
  'i-text': fontConfig,
};

export default () => {
  const currentObject = useSelector(state => state.fabric.currentObject);
  const dispatch = useDispatch();
  const [type, setType] = useState(undefined);
  const [initialValues, setInitialValues] = useState({});

  useEffect(
    () => {
      setType(currentObject?.type);
      if (currentObject) {
        setInitialValues({
          text: currentObject.get('text'),
          fontSize: currentObject.get('fontSize'),
          fill: currentObject.get('fill'),
          fontWeight: currentObject.get('fontWeight'),
          shadow: currentObject.get('shadow'),
          fontStyle: currentObject.get('fontStyle'),
          stroke: currentObject.get('stroke'),
          strokeWidth: currentObject.get('strokeWidth'),
        });
      }
    },
    [currentObject],
  );

  return (
    <Drawer
      width={500}
      mask={false}
      title="Edit"
      visible={currentObject !== null}
      onClose={() => {
        dispatch({
          type: 'fabric/updateCurrentObject',
          payload: null,
        });
      }}
    >
      {
        type && (
          <EditorForm
            items={EditorConfig[type]}
            initialValues={initialValues}
            onClose={() => {
              dispatch({
                type: 'fabric/updateCurrentObject',
                payload: null,
              });
            }}
            onDelete={() => {
              dispatch({
                type: 'fabric/willRemoveObject',
              });
            }}
            onChange={v => {
              Object.keys(v).forEach(k => {
                currentObject.set(k, v[k]);
              });
              dispatch({
                type: 'fabric/reRender',
              });
            }}
          />
        )
      }
    </Drawer>
  )
}