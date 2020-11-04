import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'umi';

export default ({
  width,
  height,
}) => {
  const canvasRef = useRef(null);
  const frames = useSelector(state => state.player.frames);
  const duration = useSelector(state => state.player.duration);
  const currentIndex = useSelector(state => state.player.currentIndex);
  const playing = useSelector(state => state.player.playing);
  const dispatch = useDispatch();

  useEffect(
    () => {
      if (frames && frames.length > 0) {
        const ctx = canvasRef.current.getContext('2d');
        ctx.putImageData(frames[currentIndex].data, 0, 0);

        const timer = setTimeout(() => {
          dispatch({
            type: 'player/playNext',
          });
        }, duration);
        return () => clearTimeout(timer);
      }
    },
    [frames, currentIndex, playing, duration],
  );

  return (
    <canvas width={width} height={height} ref={canvasRef} style={{
      position: 'absolute',
      width,
      height,
      left: '50%',
      top: '50%',
      marginLeft: -width/2,
      marginTop: -height/2,
    }} />
  )
}
