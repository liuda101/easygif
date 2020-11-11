import React, { useCallback } from 'react';
import { Button } from 'antd';
import { useDispatch } from 'umi';
import EditorGroup from '../EditorGroup';

export default () => {
  const dispatch = useDispatch();
  const handleButtonClick = useCallback(
    () => {
      dispatch({
        type: 'player/reverseFrame',
      });
    },
    [],
  );

  return (
    <EditorGroup
      title="Reverse"
      rightSlot={
        <div style={{textAlign: 'right'}}>
          <Button onClick={handleButtonClick}>Reverse</Button>
        </div>
      }
    />
  )
}