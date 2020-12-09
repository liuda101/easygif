import React, { useState, useCallback } from 'react';
import { Spin } from 'antd';
import { useSelector, useDispatch } from 'umi';
import TransformWorker from '@/gif/transforms/t.worker.js';
import EditorGroup from '../EditorGroup';

import resetImg from '@/assets/reset.png';
import grayImg from '@/assets/gray.png';
import eclecticImg from '@/assets/eclectic.png';
// import horizontalLinesImg from '@/assets/horizontal_lines.png';
// import incbrightnessImg from '@/assets/incbrightness.png';
import offsetImg from '@/assets/offset.png';
// import specksRedscaleImg from '@/assets/specks_redscale.png';
import sunsetImg from '@/assets/sunset.png';

import styles from './index.less';

export default () => {
  const frames = useSelector(state => state.player.initialFrames);
  const previewFrames = useSelector(state => state.player.initialPreviewFrames);
  const dispatch = useDispatch();

  const [filterButtons] = useState([
    {
      title: 'Reset',
      key: 'reset',
      src: resetImg,
    },
    {
      title: 'Gray',
      key: 'gray',
      src: grayImg,
    },
    {
      title: 'Eclectic',
      key: 'eclectic',
      src: eclecticImg,
    },
    // {
    //   title: 'HorizontalLines',
    //   key: 'horizontalLines',
    //   src: horizontalLinesImg,
    // },
    // {
    //   title: 'Incbrightness',
    //   key: 'incbrightness',
    //   src: incbrightnessImg,
    // },
    {
      title: 'Offset',
      key: 'offset',
      src: offsetImg,
    },
    // {
    //   title: 'SpecksRedscale',
    //   key: 'specksRedscale',
    //   src: specksRedscaleImg,
    // },
    {
      title: 'Sunset',
      key: 'sunset',
      src: sunsetImg,
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
        previewFrames,
        width: frames[0].data.width,
        height: frames[0].data.height,
      });
      worker.onmessage = (e) => {
        if (e.data.action === 'TRANSFORM_SUCCESS') {
          worker.terminate();
          setFilterKey('');
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
              <div key={button.key} className={styles.gridItem} onClick={() => {
                handleButtonClick(button);
              }}>
                <Spin spinning={filterKey === button.key}>
                  <img src={button.src} style={{display: 'block', width: 100, height: 100}} alt={button.title} />
                </Spin>
                {/* <Button
                  loading={filterKey === button.key}
                  disabled={filterKey && filterKey !== button.key}
                  onClick={() => {
                    handleButtonClick(button);
                  }}
                >
                  <img src={button.src} alt={button.title} />
                </Button> */}
              </div>
            )
          })
        }
      </div>
    </EditorGroup>
  )
}