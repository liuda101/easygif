import React, { useState, useCallback } from 'react';
import { Space, Button } from 'antd';
import { useSelector, useDispatch } from 'umi';
import TransformWorker from '@/gif/transforms/t.worker.js';
import EditorGroup from '../EditorGroup';

export default () => {
  const frames = useSelector(state => state.player.frames);
  const dispatch = useDispatch();

  const [flipButtons] = useState([
    {
      title: 'Flip X',
      key: 'x',
    },
    {
      title: 'Flip Y',
      key: 'y',
    },
  ]);
  const [flippingKey, setFlippingKey] = useState('');
  
  const handleButtonClick = useCallback(
    (button) => {
      const worker = new TransformWorker();
      setFlippingKey(button.key);
      worker.postMessage({
        action: 'flip',
        flip: button.key,
        frames,
        width: frames[0].data.width,
        height: frames[0].data.height,
      });
      worker.onmessage = (e) => {
        if (e.data.action === 'TRANSFORM_SUCCESS') {
          setFlippingKey('');
          dispatch({
            type: 'player/updateFrames',
            payload: e.data.data,
          });
        }
      };
    },
    [frames],
  );

  return (
    <EditorGroup
      title="Flip"
      rightSlot={
        <div style={{textAlign: 'right'}}>
          <Space>
            {
              flipButtons.map(button => {
                return (
                  <Button
                    key={button.key}
                    loading={flippingKey === button.key}
                    disabled={flippingKey && flippingKey !== button.key}
                    onClick={() => {
                      handleButtonClick(button);
                    }}
                  >{button.title}</Button>
                )
              })
            }
          </Space>
        </div>
      }
    />
  )
}