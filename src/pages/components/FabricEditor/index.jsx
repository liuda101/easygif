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
  const renderTrigger = useSelector(state => state.fabric.renderTrigger);
  const willRemove = useSelector(state => state.fabric.willRemove);
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
  useEffect(
    () => {
      if (renderTrigger > 0) {
        fabricCanvas.renderAll();
      }
    },
    [renderTrigger]
  );
  useEffect(
    () => {
      if (willRemove) {
        fabricCanvas.remove(willRemove);
        dispatch({
          type: 'fabric/removeObject',
        });
      }
    },
    [willRemove],
  );
  useEffect(
    () => {
      if (fabricCanvas) {
        fabricCanvas.setWidth(width);
        fabricCanvas.setHeight(height);
        fabricCanvas.renderAll();
      }
    },
    [width, height]
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
