import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'umi';
import styles from './card.less';

export default ({
  frame,
  currentIndex,
  index,
}) => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(
    () => {
      const ctx = canvasRef.current.getContext('2d');
      ctx.putImageData(frame.data, 0, 0);
    },
    [frame],
  );

  return (
    <div className={currentIndex === index ? styles.cardActive : styles.card} onClick={
      () => {
        dispatch({
          type: 'player/setIndex',
          payload: index,
        });
      }
    }>
      <canvas ref={canvasRef} width="80" height="120" />
    </div>
  )
}