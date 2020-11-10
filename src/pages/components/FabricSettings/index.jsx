import React, { useEffect } from 'react';
import { Drawer } from 'antd';
import { useSelector, useDispatch } from 'umi';

export default () => {
  const currentObject = useSelector(state => state.fabric.currentObject);
  const dispatch = useDispatch();

  useEffect(
    () => {
      console.log(currentObject);
    },
    [currentObject],
  );

  return (
    <Drawer
      width={500}
      mask={false}
      title="Edit the Object"
      visible={currentObject !== null}
      onClose={() => {
        dispatch({
          type: 'fabric/updateCurrentObject',
          payload: null,
        });
      }}
    >
      Edit
    </Drawer>
  )
}