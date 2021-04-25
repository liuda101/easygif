import React from 'react';
import { GithubOutlined, SlackOutlined } from '@ant-design/icons';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.banner}>
      <img src="/EasyGIF.png" alt="logo" />
      <div className={styles.links}>
        <a href="https://github.com/liuda101/easygif" target="_blank">
          <GithubOutlined />
        </a>
      </div>
    </div>
  )
}