import React from 'react';
import { MailOutlined } from '@ant-design/icons';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.banner}>
      <img src="/EasyGIF.png" alt="logo" />
      <div>
        <a href="mailto:liuqifeng101@gmail.com"><MailOutlined /> mail to me</a>
      </div>
    </div>
  )
}