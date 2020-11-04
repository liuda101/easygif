import React, { useState } from 'react';
import { Button, Tooltip } from 'antd';
import { RightOutlined, DownOutlined, InfoCircleOutlined } from '@ant-design/icons';
import styles from './index.less';

export default ({
  title,
  titleInfo,
  rightSlot,
  children
}) => {
  const [isContentDisplayed, setContentDisplayed] = useState(false);

  return (
    <div className={styles.group}>
      <div className={styles.groupHeader}>
        <div className={styles.headerLeft}>
          {title}
          {
            titleInfo && (
              <Tooltip title={titleInfo}>
                <InfoCircleOutlined style={{marginLeft: 8}} />
              </Tooltip>
            )
          }
        </div>
        <div className={styles.headerRight}>
          {
            rightSlot || (
              <Button
                onClick={() => setContentDisplayed(!isContentDisplayed)}
                type="text"
                icon={isContentDisplayed ? <DownOutlined /> : <RightOutlined />}
                style={{float: 'right'}}
              />
            )
          }
        </div>
      </div>
      {
        children && isContentDisplayed ? (
          <div className={styles.groupContent}>
            {children}
          </div>
        ) : null
      }
    </div>
  )
}