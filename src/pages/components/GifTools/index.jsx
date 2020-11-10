import React from 'react';
import { useSelector, useDispatch } from 'umi';
import { createFromIconfontCN } from '@ant-design/icons';
import styles from './index.less';

const EasyGifIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2178201_ven2ulwpcs.js',
});

export default () => {
  const previewFrames = useSelector(state => state.player.previewFrames);
  const dispatch = useDispatch();

  return (
    <div className={styles.tools} style={{
      height: previewFrames.length ? 50 : 0,
      padding: previewFrames.length ? 10 : 0,
    }}>
      <div className={styles.toolsBar}>
        <a title="Click to add some text" onClick={() => {
          dispatch({
            type: 'fabric/addObject',
            payload: new fabric.IText('Add text', {
              top: 0,
              left: 0,
            }),
          });
        }}>
          <EasyGifIcon type="icon-TextAdd" />
        </a>
        <a title="Click to add some pictures">
          <EasyGifIcon type="icon-image-add-line" />
        </a>
        <a title="Click to crop the gif">
          <EasyGifIcon type="icon-crop" />
        </a>
      </div>
    </div>
  )
}