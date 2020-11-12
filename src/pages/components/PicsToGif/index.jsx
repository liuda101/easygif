import React, { useState, useEffect } from 'react';
import { useSelector } from 'umi';
import { Progress } from 'antd';
import Worker from '@/gif/parser/parsePics.worker.js';
import filesToImgs from '@/utils/filesToImgs';
import styles from './index.less';

export default ({
  onSubmit,
}) => {
  const [parsing, setParsing] = useState(false);
  const [parsePercent, setParsePercent] = useState(0);
  const files = useSelector(state => state.parser.file);

  useEffect(
    () => {
      setParsing(true);
      filesToImgs(files).then(result => {
        let minWidth = 0;
        let minHeight = 0;
        result.forEach(item => {
          if (minWidth === 0 || item.width < minWidth) {
            minWidth = item.width;
          }
          if (minHeight === 0 || item.height < minHeight) {
            minHeight = item.height;
          }
        });

        minWidth = minWidth > 1000 ? 1000 : minWidth;
        minHeight = minHeight > 1000 ? 1000 : minHeight;

        const worker = new Worker();
        worker.postMessage({
          images: result,
          width: minWidth,
          height: minHeight,
        });
        worker.onmessage = (e) => {
          if (e.data.action === 'FINISHED') {
            result = null;
            onSubmit({
              frameData: e.data.result,
              width: minWidth,
              height: minHeight,
            });
            worker.terminate();
          } else if (e.data.action === 'PROGRESS') {
            setParsePercent((e.data.percent * 100).toFixed(2));
          }
        };
      });
    },
    [files],
  );

  return (
    <div className={styles.pics}>
      <div className={styles.parseCircle}>
        <Progress percent={parsePercent} type="circle" />
      </div>
    </div>
  )
}
