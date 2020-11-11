import React from 'react';
import SpeedController from './SpeedController';
import RotateController from './RotateController';
import FlipController from './FlipController';
import FilterController from './FilterController';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.editor}>
      <SpeedController />
      <RotateController />
      <FlipController />
      <FilterController />
    </div>
  )
}