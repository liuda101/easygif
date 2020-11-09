import React from 'react';
import { Tabs } from 'antd';
import DiscussApp from './components/DiscussApp';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <img src="/EasyGIF.png" alt="logo" />
      </div>
      <Tabs>
        <Tabs.TabPane tab="How to use" key="howtouse">
          How to use
        </Tabs.TabPane>
        <Tabs.TabPane tab="Discuss" key="discuss">
          <DiscussApp />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}