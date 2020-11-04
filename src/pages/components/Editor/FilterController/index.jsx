import React, { useState, useCallback } from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'umi';
import TransformWorker from '@/gif/transforms/t.worker.js';
import EditorGroup from '../EditorGroup';

import styles from './index.less';

export default () => {
  const frames = useSelector(state => state.player.frames);
  const dispatch = useDispatch();

  const [filterButtons] = useState([
    {
      title: 'Reset',
      key: 'reset',
    },
    {
      title: 'Gray',
      key: 'gray',
    },
    {
      title: 'OffsetGreen',
      key: 'offsetGreen',
    },
    {
      title: 'Sunset',
      key: 'sunset',
    },
  ]);
  const [filterKey, setFilterKey] = useState('');
  
  const handleButtonClick = useCallback(
    (button) => {
      if (button.key === 'reset') {
        dispatch({
          type: 'player/resetFrames',
        });
        return;
      }

      const worker = new TransformWorker();
      setFilterKey(button.key);
      worker.postMessage({
        action: 'filter',
        filter: button.key,
        frames,
        width: frames[0].data.width,
        height: frames[0].data.height,
      });
      worker.onmessage = (e) => {
        if (e.data.action === 'TRANSFORM_SUCCESS') {
          setFilterKey('');
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
      title="Filters"
    >
      <div className={styles.grid}>
        {
          filterButtons.map(button => {
            return (
              <div key={button.key} className={styles.gridItem}>
                <Button
                  loading={filterKey === button.key}
                  disabled={filterKey && filterKey !== button.key}
                  onClick={() => {
                    handleButtonClick(button);
                  }}
                >{button.title}</Button>
              </div>
            )
          })
        }
      </div>
    </EditorGroup>
  )
}