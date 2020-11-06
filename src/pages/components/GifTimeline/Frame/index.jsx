import React from 'react';
import { useSelector } from 'umi';
import FrameCard from './card';
import styles from './index.less';

export default () => {
  const previewFrames = useSelector(state => state.player.previewFrames);
  const currentIndex = useSelector(state => state.player.currentIndex);

  return (
    <div className={styles.cardScroll}>
      <div className={styles.cardContainer} style={{
        width: previewFrames.length * 85 + 5
      }}>
        {
          previewFrames.map((frame, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <FrameCard frame={frame} key={index} index={index} currentIndex={currentIndex} />
            )
          })
        }
      </div>
    </div>
  )
}
