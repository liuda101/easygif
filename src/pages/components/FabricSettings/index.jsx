import React, { useState, useEffect } from 'react';
import { Drawer } from 'antd';
import { useSelector, useDispatch } from 'umi';
import FontEditor from './components/FontEditor';

const EditorMap = {
  'i-text': FontEditor,
};

function CurrentEditor({
  type,
  props = {},
}) {
  const Editor = EditorMap[type];
  return Editor ? <Editor {...props} /> : null;
}

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
      <CurrentEditor
        type={type}
        props={{
          initialValues: initialValues,
          onChange(v) {
            const key = Object.keys(v)[0];
            currentObject.set(key, v[key]);
          }
        }}
      />
    </Drawer>
  )
}