import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { useSelector, useDispatch } from 'umi';
import { createFromIconfontCN } from '@ant-design/icons';
import ResizeWorker from '@/gif/resize/resize.worker.js';
import styles from './index.less';

const EasyGifIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2178201_ven2ulwpcs.js',
});

export default () => {
  const previewFrames = useSelector(state => state.player.previewFrames);
  const isClipping = useSelector(state => state.clip.isClipping);
  const resize = useSelector(state => state.clip.resize);
  const frames = useSelector(state => state.player.frames);
  const [resizing, setResizing] = useState(-1);
  const dispatch = useDispatch();

  return (
    <div className={styles.tools} style={{
      height: previewFrames.length ? 50 : 0,
      padding: previewFrames.length ? 10 : 0,
    }}>
      {
        isClipping ? (
          <div>
            <Space>
              <Button size="small" type="primary" onClick={() => {
                const worker = new ResizeWorker();
                worker.postMessage({
                  frames,
                  width: frames[0].data.width,
                  height: frames[0].data.height,
                  resize,
                });
                setResizing(0);
                worker.onmessage = (e) => {
                  if (e.data.action === 'FINISHED') {
                    worker.terminate();
                    dispatch({
                      type: 'player/updateFrames',
                      payload: {
                        frames: e.data.data.map(item => {
                          return {
                            data: item.frame,
                          }
                        }),
                        previewFrames: e.data.data.map(item => {
                          return {
                            data: item.preview,
                          }
                        }),
                      },
                    });
                    dispatch({
                      type: 'player/setInitialFrames',
                      payload: {
                        frames: e.data.data.map(item => {
                          return {
                            data: item.frame,
                          }
                        }),
                        previewFrames: e.data.data.map(item => {
                          return {
                            data: item.preview,
                          }
                        }),
                      },
                    });
                    dispatch({
                      type: 'player/updateSize',
                      payload: {
                        width: resize.width,
                        height: resize.height,
                      },
                    });
                    dispatch({
                      type: 'clip/stopClip',
                    });
                    setResizing(-1);
                  } else {
                    setResizing(e.data.percent);
                  }
                };
              }} loading={resizing > -1}>
                {resizing > -1 ? (resizing * 100).toFixed(2) + '%' : 'Apply'}
              </Button>
              <Button size="small" onClick={() => {
                setResizing(-1);
                dispatch({
                  type: 'clip/stopClip',
                });
              }}>Cancel</Button>
            </Space>
          </div>
        ) : (
          <div className={styles.toolsBar}>
            <a title="Click to add some text" onClick={() => {
              const text = new fabric.IText('Add text', {
                top: 0,
                left: 0,
                fontSize: 30,
              });
              text.on('selected', () => {
                dispatch({
                  type: 'fabric/updateCurrentObject',
                  payload: text,
                });
              });
              dispatch({
                type: 'fabric/addObject',
                payload: text,
              });
            }}>
              <EasyGifIcon type="icon-TextAdd" />
            </a>
            {/* <a title="Click to add some pictures">
              <EasyGifIcon type="icon-image-add-line" />
            </a> */}
            <a title="Click to crop the gif" onClick={() => {
              dispatch({
                type: 'clip/startClip',
              });
            }}>
              <EasyGifIcon type="icon-crop" />
            </a>
          </div>
        )
      }
    </div>
  )
}