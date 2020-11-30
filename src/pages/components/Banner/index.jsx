import React from 'react';
import { TwitterOutlined } from '@ant-design/icons';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.banner}>
      <img src="/EasyGIF.png" alt="logo" />
      <div>
        <a href="https://twitter.com/liuqifeng101" target="_blank">
          <TwitterOutlined />
        </a>
      </div>
    </div>
  )
}