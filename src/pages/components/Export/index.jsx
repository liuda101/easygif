import React, { useState, useCallback } from 'react';
import { Button, notification } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useSelector } from 'umi';
import EncoderWorker from '@/gif/encoder/encoder.worker.js';
import getFabricData from './getFabricData';

import styles from './index.less';

export default () => {
  const [exporting, setExporting] = useState(false);
  const [exportingPercent, setExportingPercent] = useState(0);
  const frames = useSelector(state => state.player.frames);
  const duration = useSelector(state => state.player.duration);
  const repeat = useSelector(state => state.player.repeat);
  const fabricCanvas = useSelector(state => state.fabric.fabricCanvas);
  const fabricObjList = useSelector(state => state.fabric.objectList);

  const handleExport = useCallback(
    () => {
      setExporting(true);
      notification.info({
        message: 'Preparing data',
        description: 'It may take some time, just wait.',
        key: 'EXPORT',
        duration: null,
      });
      getFabricData(frames.length, fabricCanvas, fabricObjList).then(data => {
        notification.close('EXPORT');
        fabricObjList.forEach(obj => {
          obj.set('opacity', 1);
        });
        fabricCanvas.renderAll();

        const worker = new EncoderWorker();
        worker.postMessage({
          width: frames[0].data.width,
          height: frames[0].data.height,
          frames: frames,
          fabricDataList: data,
          delay: duration,
          repeat: repeat,
        });
        worker.onmessage = (e) => {
          if (e.data.action === 'FINISHED') {
            setExporting(false);
            const link = document.createElement('a');
            link.download = 'download.gif';
            link.href = URL.createObjectURL(new Blob([new Uint8Array(e.data.data)], { type: 'image/gif' }));
            link.click();
          } else if (e.data.action === 'PROGRESS') {
            setExportingPercent(e.data.percent.toFixed(2));
          }
        };
      });
    },
    [frames, duration, repeat, fabricCanvas, fabricObjList],
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
          <DownloadOutlined /> { exporting ? `${exportingPercent}%` : 'Export'}
        </Button>
      </div>
      <div className={styles.content} />
    </div>
  )
}