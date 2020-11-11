import React, { useState, useCallback } from 'react';
import { Space, Button } from 'antd';
import { useSelector, useDispatch } from 'umi';
import { RotateLeftOutlined, RotateRightOutlined } from '@ant-design/icons';
import TransformWorker from '@/gif/transforms/t.worker.js';
import EditorGroup from '../EditorGroup';

export default () => {
  const frames = useSelector(state => state.player.initialFrames);
  const previewFrames = useSelector(state => state.player.initialPreviewFrames);
  const dispatch = useDispatch();
  const [currentRotate, setCurrentRotate] = useState(0);

  const [rotateButtons] = useState([
    {
      icon: RotateLeftOutlined,
      key: 'RotateLeft',
      delta: -90
    },
    {
      icon: RotateRightOutlined,
      key: 'RotateRight',
      delta: 90,
    },
  ]);
  const [rotatingKey, setRotatingKey] = useState('');
  
  const handleButtonClick = useCallback(
    (button) => {
      const worker = new TransformWorker();
      setRotatingKey(button.key);
      worker.postMessage({
        action: 'rotate',
        delta: currentRotate + button.delta,
        frames,
        previewFrames,
        width: frames[0].data.width,
        height: frames[0].data.height,
      });
      dispatch({
        type: 'player/rotateFrame',
      });
      worker.onmessage = (e) => {
        if (e.data.action === 'TRANSFORM_SUCCESS') {
          worker.terminate();
          setCurrentRotate(currentRotate + button.delta);
          setRotatingKey('');
          dispatch({
            type: 'player/updateFrames',
            payload: {
              frames: e.data.data.frames,
              previewFrames: e.data.data.previewFrames,
            },
          });
        }
      };
    },
    [frames, currentRotate],
  );

  return (
    <EditorGroup
      title="Rotate"
      rightSlot={
        <div style={{textAlign: 'right'}}>
          <Space>
            {
              rotateButtons.map(button => {
                const Icon = button.icon;
                return (
                  <Button
                    key={button.key}
                    loading={rotatingKey === button.key}
                    disabled={rotatingKey && rotatingKey !== button.key}
                    onClick={() => {
                      handleButtonClick(button);
                    }}
                  >
                    <Icon />
                  </Button>
                )
              })
            }
          </Space>
        </div>
      }
    />
  )
}