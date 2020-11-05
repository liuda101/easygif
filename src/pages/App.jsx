import React from 'react';
import { Modal, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'umi';
import GifPlayer from './components/GifPlayer';
import GifTimeline from './components/GifTimeline';
import Banner from './components/Banner';
import Editor from './components/Editor';
import Export from './components/Export';
import styles from './app.less';

export default () => {
  const dispatch = useDispatch();
  const file = useSelector(state => state.parser.file);

  return (
    <div className={styles.app}>
      <div className={styles.canvas}>
        <GifPlayer />
        <GifTimeline />
      </div>
      <div className={styles.panel}>
        <Banner />
        <Editor />
        <Export />
      </div>

      <Modal
        title="Please select a gif file"
        visible={file === null}
        closable={false}
        footer={null}
      >
        <div style={{height: 300}}>
          <Upload.Dragger
            accept=".gif"
            beforeUpload={(fileSelected) => {
              dispatch({
                type: 'parser/resetFile',
                payload: fileSelected,
              });
              return false;
            }}
            showUploadList={false}
          >
            <p><InboxOutlined style={{fontSize: 50}} /></p>
            <p>Click or drag a gif to this area</p>
          </Upload.Dragger>
        </div>
      </Modal>
    </div>
  )
}
