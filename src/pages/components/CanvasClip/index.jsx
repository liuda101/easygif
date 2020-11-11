import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'umi';
import { Rnd } from 'react-rnd';

export default ({
  width,
  height,
}) => {
  const dispatch = useDispatch();
  const handleClipDone = useCallback(
    () => {
      const div = document.querySelector('.react-draggable');
      const resize = {
        width: parseInt(div.style.width, 10),
        height: parseInt(div.style.height, 10),
      };
      const transform = div.style.transform || div.style.webkitTransform;
      const transformPixels = transform.substring('translate('.length, transform.length - 1);
      resize.left = parseInt(transformPixels.split(',')[0], 10);
      resize.top = parseInt(transformPixels.split(',')[1], 10);
      dispatch({
        type: 'clip/updateResize',
        payload: resize,
      });
    },
    [],
  );
  useEffect(
    () => {
      dispatch({
        type: 'clip/updateResize',
        payload: {
          width: parseInt(width / 2, 10),
          height: parseInt(height / 2, 10),
          top: parseInt(height / 4, 10),
          left: parseInt(width / 4, 10),
        },
      });
    },
    [],
  );
  return (
    <div
      style={{
        position: 'absolute',
        width,
        height,
        left: '50%',
        top: '50%',
        marginLeft: -width/2,
        marginTop: -height/2,
        zIndex: 12,
        overflow: 'hidden',
      }}
    >
      <Rnd
        default={{
          x: width / 4,
          y: height / 4,
          width: width / 2,
          height: height / 2,
        }}
        bounds="parent"
        minWidth="20%"
        minHeight="20%"
        onDragStop={handleClipDone}
        onResizeStop={handleClipDone}
        resizeHandleStyles={{
          bottom: {
            height: '1px',
            background: 'rgba(255,255,255,0.8)',
            bottom: 0,
          },
          top: {
            height: '1px',
            background: 'rgba(255,255,255,0.8)',
            top: 0,
          },
          left: {
            width: '1px',
            background: 'rgba(255,255,255,0.8)',
            left: 0,
          },
          right: {
            width: '1px',
            background: 'rgba(255,255,255,0.8)',
            right: 0,
          },
          bottomLeft: {
            background: 'rgba(255,255,255,0.8)',
            borderRadius: '100%',
            width: '10px',
            height: '10px',
            left: '-5px',
            bottom: '-5px',
          },
          bottomRight: {
            background: 'rgba(255,255,255,0.8)',
            borderRadius: '100%',
            width: '10px',
            height: '10px',
            right: '-5px',
            bottom: '-5px',
          },
          topLeft: {
            background: 'rgba(255,255,255,0.8)',
            borderRadius: '100%',
            width: '10px',
            height: '10px',
            left: '-5px',
            top: '-5px',
          },
          topRight: {
            background: 'rgba(255,255,255,0.8)',
            borderRadius: '100%',
            width: '10px',
            height: '10px',
            right: '-5px',
            top: '-5px',
          }
        }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          outline: 'solid 100000000px rgba(0,0,0,0.618)'
        }} />
      </Rnd>
    </div>
  )
}