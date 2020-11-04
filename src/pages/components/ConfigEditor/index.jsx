import React, { useState } from 'react';
import { RightOutlined, DownOutlined } from '@ant-design/icons';
import styles from './index.less';

export default ({
  title,
  children,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.editor}>
      <div className={styles.editorHeader}>
        {title}
        <span onClick={() => {
          setShow(!show);
        }}>
          {
            show ? <DownOutlined /> : <RightOutlined />
          }
        </span>
      </div>
      {
        show && (
          <div className={styles.editorContent}>
            {children}
          </div>
        )
      }
    </div>
  )
}