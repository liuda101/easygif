import React, { useState, useCallback } from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useSelector } from 'umi';

import styles from './index.less';

export default () => {
  const [exporting, setExporting] = useState(false);
  const frames = useSelector(state => state.player.frames);
  const duration = useSelector(state => state.player.duration);

  const handleExport = useCallback(
    () => {
    },
    [frames, duration],
  );

  return (
    <div className={styles.export}>
      <div className={styles.header}>
        <Button
          block
          type="primary"
          loading={exporting}
          onClick={handleExport}
        >
          <DownloadOutlined /> Export
        </Button>
      </div>
      <div className={styles.content} />
    </div>
  )
}