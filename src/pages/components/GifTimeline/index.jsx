import React from 'react';
import { Button, Switch } from 'antd';
import { useSelector, useDispatch } from 'umi';
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';
import Frame from './Frame';

import styles from './index.less';

export default () => {
  const playing = useSelector(state => state.player.playing);
  const previewFrames = useSelector(state => state.player.previewFrames);
  const dispatch = useDispatch();

  return (
    <div className={styles.timeline} style={{
      height: previewFrames.length === 0 ? 0 : 195,
    }}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          Timeline <span style={{fontSize: 12}}>({previewFrames.length} frames)</span>
        </div>
        <div className={styles.headerCenter}>
          <Button onClick={() => {
            dispatch({
              type: 'player/togglePlay',
            });
          }} type="link" size="large" icon={
            playing ? <PauseCircleFilled /> : <PlayCircleFilled />
          } />
        </div>
        <div className={styles.headerRight}>
          Repeat <Switch size="small" />
        </div>
      </div>
      <div className={styles.content}>
        <Frame />
      </div>
    </div>
  )
}