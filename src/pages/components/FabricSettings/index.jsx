import React, { useState, useEffect } from 'react';
import { Drawer } from 'antd';
import { useSelector, useDispatch } from 'umi';
import EditorForm from './components/EditorForm';
import FramesSelector from './components/FramesSelector';
import fontConfig from './config/font';

const EditorConfig = {
  'i-text': fontConfig,
};

export default () => {
  const currentObject = useSelector(state => state.fabric.currentObject);
  const frames = useSelector(state => state.player.frames);
  const dispatch = useDispatch();
  const [type, setType] = useState(undefined);
  const [initialValues, setInitialValues] = useState({});
  const [frameRange, setFrameRange] = useState([1, frames.length]);

  useEffect(
    () => {
      setType(currentObject?.type);
      if (currentObject) {
        setFrameRange(currentObject._frameRange ? currentObject._frameRange : [1, frames.length]);
        setInitialValues({
          text: currentObject.get('text'),
          fontSize: currentObject.get('fontSize'),
          fontFamily: currentObject.get('fontFamily'),
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
            framesSelector={
              <FramesSelector
                max={frames.length}
                value={frameRange}
                onChange={v => {
                  setFrameRange(v);
                  dispatch({
                    type: 'fabric/updateFrames',
                    payload: v,
                  });
                }}
              />
            }
          />
        )
      }
    </Drawer>
  )
}