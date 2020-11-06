import React, { useRef, useEffect } from 'react';
import styles from './card.less';

export default ({
  frame,
  index,
  currentIndex,
  onClickItem,
}) => {
  const canvasRef = useRef(null);

  useEffect(
    () => {
      const ctx = canvasRef.current.getContext('2d');
      ctx.putImageData(frame.data, 0, 0);
    },
    [frame],
  );

  return (
    <div className={styles.card} onClick={onClickItem} style={{borderColor: index === currentIndex ? '#fff' : '#333'}}>
      <canvas ref={canvasRef} width="78" height="118" />
    </div>
  )
}