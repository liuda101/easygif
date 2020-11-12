import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Dropdown, Menu, message } from 'antd';
import { useDispatch } from 'umi';
import AddNewFrame from './AddNewFrame';
import styles from './card.less';

export default ({
  frame,
  index,
  currentIndex,
  onClickItem,
  count,
}) => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const [addingFrame, setAddingFrame] = useState({
    visible: false,
    pos: -1
  });

  useEffect(
    () => {
      const ctx = canvasRef.current.getContext('2d');
      ctx.putImageData(frame.data, 0, 0);
    },
    [frame],
  );

  const handleDelete = useCallback(
    () => {
      if (count <= 2) {
        message.error('A gif should have two frames at least');
        return;
      }
      dispatch({
        type: 'player/removeFrameAtIndex',
        payload: currentIndex,
      });
    },
    [currentIndex],
  );

  const handleMenuClick = useCallback(
    ({ key }) => {
      switch (key) {
        case 'delete':
          handleDelete();
          break;
        case 'insertLeft':
          setAddingFrame({
            visible: true,
            pos: -1,
          });
          break;
        case 'insertRight':
          setAddingFrame({
            visible: true,
            pos: 1,
          });
          break;
      }
    },
    [],
  );

  return (
    <>
      <Dropdown
        trigger={['contextMenu']}
        overlay={
          <Menu
            onClick={handleMenuClick}
          >
            <Menu.Item key="insertLeft">
              Insert Left
            </Menu.Item>
            <Menu.Item key="insertRight">
              Insert Right
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item danger key="delete">
              Delete
            </Menu.Item>
          </Menu>
        }
      >
        <div
          className={styles.card}
          onClick={onClickItem}
          style={{borderColor: index === currentIndex ? '#fff' : '#333'}}
        >
          <canvas ref={canvasRef} width="78" height="118" />
        </div>
      </Dropdown>
      {
        addingFrame.visible && (
          <AddNewFrame
            onCancel={() => {
              setAddingFrame({
                visible: false,
              });
            }}
            onGotFrame={(data) => {
              dispatch({
                type: 'player/addNewFrame',
                payload: {
                  data,
                  currentIndex,
                  pos: addingFrame.pos,
                }
              });
              setAddingFrame({
                visible: false,
              });
            }}
          />
        )
      }
    </>
  )
}