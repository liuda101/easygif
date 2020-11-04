import React, { useState, useEffect } from 'react';
import { Slider } from 'antd';
import { useSelector, useDispatch } from 'umi';
import EditorGroup from '../EditorGroup';

export default () => {
  const duration = useSelector(state => state.player.duration);
  const dispatch = useDispatch();

  const [localDuration, setLocalDurtaion] = useState(0);
  useEffect(
    () => {
      setLocalDurtaion(duration);
    },
    [duration],
  );

  return (
    <EditorGroup
      title="Delay"
      titleInfo="The duration between tow frames."
      rightSlot={
        <Slider
          min={15}
          max={300}
          step={1}
          value={localDuration}
          onChange={v => setLocalDurtaion(v)}
          onAfterChange={v => {
            dispatch({
              type: 'player/updateDuration',
              payload: v,
            });
          }}
        />
      }
    />
  )
}