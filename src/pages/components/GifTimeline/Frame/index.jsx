import React from 'react';
import { useSelector } from 'umi';
import FrameCard from './card';
import styles from './index.less';

export default () => {
  const frames = useSelector(state => state.player.frames);
  const currentIndex = useSelector(state => state.player.currentIndex);

  return (
    <div className={styles.cardScroll}>
      <div className={styles.cardContainer} style={{
        width: frames.length * 85 + 5
      }}>
        {
          frames.map((frame, index) => {
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
