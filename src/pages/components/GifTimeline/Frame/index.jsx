import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'umi';
import FrameCard from './card';
import styles from './index.less';

export default () => {
  const previewFrames = useSelector(state => state.player.previewFrames);
  const currentIndex = useSelector(state => state.player.currentIndex);
  const dispatch = useDispatch();

  const [localIndex, setLocalIndex] = useState(currentIndex);
  const [mouseOver, setMouseOver] = useState(false);
  useEffect(
    () => {
      if (!mouseOver) {
        setLocalIndex(currentIndex);
      }
    },
    [mouseOver, currentIndex],
  );

  const container = useRef();

  return (
    <div className={styles.cardScroll} onMouseEnter={() => {
      setMouseOver(true);
    }} onMouseLeave={(e) => {
      setMouseOver(false);
    }} ref={container}>
      <div className={styles.cardContainer} style={{
        width: previewFrames.length * 80,
        transform: `translate3d(${localIndex * -80}px, 0, 0)`,
      }}>
        {
          previewFrames.map((frame, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <FrameCard frame={frame} key={index} index={index} currentIndex={localIndex} onClickItem={() => {
                dispatch({
                  type: 'player/setIndex',
                  payload: index,
                });
                setLocalIndex(index);
              }} />
            )
          })
        }
      </div>
      <div className={styles.indicator} />
      <div className={styles.scrollBar} style={{
        marginLeft: `calc(${(localIndex / previewFrames.length) * 100}% - 80px)`,
      }} />
    </div>
  )
}
