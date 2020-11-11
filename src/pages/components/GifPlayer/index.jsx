import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'umi';
import { Progress } from 'antd';
import Worker from '@/gif/parser/parse.worker.js';
import parseVideo from '@/gif/parser/video.parse.js';
import Player from './Player';
import PicsToGif from '../PicsToGif';
import FabricEditor from '../FabricEditor';
import CanvasClip from '../CanvasClip';
import styles from './index.less';

export default () => {
  const dispatch = useDispatch();
  const file = useSelector(state => state.parser.file);
  const fileType = useSelector(state => state.parser.fileType);

  const clipping = useSelector(state => state.clip.isClipping);

  const [parsing, setParsing] = useState(false);
  const [parsePercent, setParsePercent] = useState(0);
  const [imgSrc, setImgSrc] = useState(null);
  const imgSize = useSelector(state => state.player.size);

  const videoRef = useRef(null);
  const handleVideoPlay = useCallback(
    () => {
      // 设置高度
      if (imgSize.height === 0) {
        dispatch({
          type: 'player/updateSize',
          payload: {
            width: 360,
            height: videoRef.current.offsetHeight,
          }
        });

        parseVideo(videoRef.current, {
          width: 360,
          height: videoRef.current.offsetHeight,
        }, {
          onParseFinished(data) {
            setParsing(false);
            dispatch({
              type: 'player/updateDuration',
              payload: 160,
            });
            dispatch({
              type: 'player/updateFrames',
              payload: data,
            });
            dispatch({
              type: 'player/setInitialFrames',
              payload: data,
            });
          }
        });
      }
    },
    [imgSize, videoRef],
  );

  useEffect(
    () => {
      if (file) {
        setParsing(true);

        if (fileType === 'GIF') {
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
                  payload: event.data.data.frames[0].delay * 10,
                });
                dispatch({
                  type: 'player/updateFrames',
                  payload: {
                    frames: event.data.data.frames,
                    previewFrames: event.data.data.previewFrames,
                  },
                });
                dispatch({
                  type: 'player/setInitialFrames',
                  payload: {
                    frames: event.data.data.frames,
                    previewFrames: event.data.data.previewFrames,
                  },
                });
                setParsing(false);
                worker.terminate();
              } else if (event.data.action === 'HDR') {
                dispatch({
                  type: 'player/updateSize',
                  payload: {
                    width: event.data.data.width,
                    height: event.data.data.height,
                  }
                });
              }
            };
          };
          reader.readAsDataURL(file);
        } else if (fileType === 'VIDEO') {
          const reader = new FileReader();
          dispatch({
            type: 'player/updateSize',
            payload: {
              width: 360,
              height: 0,
            }
          });
          reader.onload = () => {
            const base64 = reader.result;
            setImgSrc(base64);
          };
          reader.readAsDataURL(file);
        }
      }
    },
    [file, fileType],
  );

  return (
    <div className={styles.player}>
      {
        fileType === 'GIF' && imgSrc && parsing && imgSize.width > 0 ? (
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

      {
        fileType === 'VIDEO' && imgSrc && parsing ? (
          <div className={styles.parsing} style={{
            marginLeft: -imgSize.width/2,
            marginTop: -imgSize.height/2,
            ...imgSize,
          }}>
            <video
              src={imgSrc}
              muted
              autoPlay
              controls={false}
              width={360}
              ref={videoRef}
              onPlay={handleVideoPlay}
              onTimeUpdate={() => {
                setParsePercent(((videoRef.current.currentTime / videoRef.current.duration) * 100).toFixed(2));
              }}
            />
            <div className={styles.parseCircle}>
              <Progress percent={parsePercent} type="circle" />
            </div>
          </div>
        ) : null
      }
      {
        fileType === 'PICS' && parsing ? (
          <PicsToGif
            onSubmit={data => {
              setParsing(false);
              dispatch({
                type: 'player/updateSize',
                payload: {
                  width: data.width,
                  height: data.height,
                }
              });
              dispatch({
                type: 'player/updateDuration',
                payload: 160,
              });
              dispatch({
                type: 'player/updateFrames',
                payload: {
                  frames: data.frameData.map(item => {
                    return {
                      data: item.largeData,
                    }
                  }),
                  previewFrames: data.frameData.map(item => {
                    return {
                      data: item.previewData,
                    }
                  }),
                },
              });
              dispatch({
                type: 'player/setInitialFrames',
                payload: {
                  frames: data.frameData.map(item => {
                    return {
                      data: item.largeData,
                    }
                  }),
                  previewFrames: data.frameData.map(item => {
                    return {
                      data: item.previewData,
                    }
                  }),
                },
              });
            }}
          />
        ) : null
      }
      <Player {...imgSize} />
      {
        imgSize.height > 0 && (
          <FabricEditor {...imgSize} />
        )
      }
      {
        imgSize.height > 0 && clipping && (
          <CanvasClip {...imgSize} />
        )
      }
    </div>
  )
}