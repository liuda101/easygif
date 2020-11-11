import React from 'react';
import SpeedController from './SpeedController';
import ReverseController from './ReverseController';
import RotateController from './RotateController';
import FlipController from './FlipController';
import FilterController from './FilterController';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.editor}>
      <SpeedController />
      <ReverseController />
      <RotateController />
      <FlipController />
      <FilterController />
    </div>
  )
}