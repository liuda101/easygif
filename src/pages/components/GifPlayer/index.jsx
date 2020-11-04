import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'umi';
import { Progress } from 'antd';
import Worker from '@/gif/parser/parse.worker.js';
import Player from './Player';
import styles from './index.less';

export default () => {
  const dispatch = useDispatch();
  const file = useSelector(state => state.parser.file);

  const [parsing, setParsing] = useState(false);
  const [parsePercent, setParsePercent] = useState(0);
  const [imgSrc, setImgSrc] = useState(null);
  const [imgSize, setImgSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(
    () => {
      if (file) {
        setParsing(true);
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result;
          setImgSrc(base64);

          const worker = new Worker();
          worker.postMessage({
            action: 'BEGIN_PARSE',
            data: base64,
          });
          worker.onmessage = (event) => {
            if (event.data.action === 'PROGRESS') {
              setParsePercent(((event.data.current / event.data.total) * 100).toFixed(2));
            } else if (event.data.action === 'SUCCESS') {
              dispatch({
                type: 'player/updateDuration',
                payload: event.data.data[0].delay * 10,
              });
              dispatch({
                type: 'player/updateFrames',
                payload: event.data.data,
              });
              dispatch({
                type: 'player/setInitialFrames',
                payload: event.data.data,
              });
              setParsing(false);
              worker.terminate();
            } else if (event.data.action === 'HDR') {
              setImgSize({
                width: event.data.data.width,
                height: event.data.data.height,
              });
            }
          };
        };
        reader.readAsDataURL(file);
      }
    },
    [file],
  );

  return (
    <div className={styles.player}>
      {
        imgSrc && parsing && imgSize.width > 0 ? (
          <div className={styles.parsing} style={{
            marginLeft: -imgSize.width/2,
            marginTop: -imgSize.height/2,
            ...imgSize,
          }}>
            <img src={imgSrc} alt="gif" />
            <div className={styles.parseCircle}>
              <Progress percent={parsePercent} type="circle" />
            </div>
          </div>
        ) : null
      }
      <Player {...imgSize} />
    </div>
  )
}