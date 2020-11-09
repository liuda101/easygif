import React from 'react';
import { Button, Switch, Tooltip, Space } from 'antd';
import { useSelector, useDispatch } from 'umi';
import { PlayCircleFilled, PauseCircleFilled, InfoCircleOutlined } from '@ant-design/icons';
import Frame from './Frame';

import styles from './index.less';

export default () => {
  const playing = useSelector(state => state.player.playing);
  const repeat = useSelector(state => state.player.repeat);
  const previewFrames = useSelector(state => state.player.previewFrames);
  const dispatch = useDispatch();

  return (
    <div className={styles.timeline} style={{
      height: previewFrames.length === 0 ? 0 : 195,
    }}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Space>
            Timeline
            <span style={{fontSize: 12}}>({previewFrames.length} frames)</span>
          </Space>
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
          Repeat <Switch size="small" checked={repeat} onChange={e => {
            dispatch({
              type: 'player/toggleRepeat',
            });
          }} />
        </div>
      </div>
      <div className={styles.content}>
        <Frame />
      </div>
    </div>
  )
}