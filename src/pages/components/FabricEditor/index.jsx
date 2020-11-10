import React, { useRef, useEffect } from 'react';
import { useSelector } from 'umi';
import FabricSettings from '../FabricSettings';

let fabricCanvas;

export default ({
  width,
  height,
}) => {
  const canvasRef = useRef(null);
  useEffect(
    () => {
      fabricCanvas = new window.fabric.Canvas(canvasRef.current);
    },
    [],
  );

  const objectList = useSelector(state => state.fabric.objectList);
  useEffect(
    () => {
      objectList.forEach(obj => {
        console.log(obj);
        if (!fabricCanvas.contains(obj)) {
          fabricCanvas.add(obj);
        }
      });
    },
    [objectList],
  );

  return (
    <div>
      <div
        style={{
          position: 'absolute',
          width,
          height,
          left: '50%',
          top: '50%',
          marginLeft: -width/2,
          marginTop: -height/2,
          zIndex: 10,
        }}
      >
        <canvas width={width} height={height} ref={canvasRef} />
      </div>
      <FabricSettings />
    </div>
  )
}
