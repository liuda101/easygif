import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'umi';
import FabricSettings from '../FabricSettings';

let fabricCanvas;

export default ({
  width,
  height,
}) => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(
    () => {
      fabricCanvas = new window.fabric.Canvas(canvasRef.current);
      dispatch({
        type: 'fabric/setCanvas',
        payload: fabricCanvas,
      });
    },
    [],
  );

  const objectList = useSelector(state => state.fabric.objectList);
  const currentObject = useSelector(state => state.fabric.currentObject);
  useEffect(
    () => {
      objectList.forEach(obj => {
        if (!fabricCanvas.contains(obj)) {
          fabricCanvas.add(obj);
          fabricCanvas.setActiveObject(obj);
        }
      });
    },
    [objectList],
  );
  useEffect(
    () => {
      if (!currentObject) {
        fabricCanvas.discardActiveObject();
      }
    },
    [currentObject],
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
