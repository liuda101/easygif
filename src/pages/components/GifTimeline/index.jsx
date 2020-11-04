import React from 'react';
import { Button, Switch } from 'antd';
import { useSelector, useDispatch } from 'umi';
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import Frame from './Frame';

import styles from './index.less';

export default () => {
  const playing = useSelector(state => state.player.playing);
  const frames = useSelector(state => state.player.frames);
  const dispatch = useDispatch();

  return (
    <div className={styles.timeline}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          Timeline <span style={{fontSize: 12}}>({frames.length} frames)</span>
        </div>
        <div className={styles.headerCenter}>
          <Button onClick={() => {
            dispatch({
              type: 'player/togglePlay',
            });
          }} type="link" size="large" icon={
            playing ? <PauseCircleOutlined /> : <PlayCircleOutlined />
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