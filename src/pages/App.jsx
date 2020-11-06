import React from 'react';
import { Modal, Upload, Row, Col } from 'antd';
import { FileGifOutlined, VideoCameraAddOutlined } from '@ant-design/icons';
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
  const frames = useSelector(state => state.player.frames);

  return (
    <div className={styles.app}>
      <div className={styles.canvas}>
        <GifPlayer />
        <GifTimeline />
      </div>
      <div className={styles.panel} style={{
        width: frames.length === 0 ? 0 : 500,
      }}>
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
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <div style={{height: 150}}>
              <Upload.Dragger
                accept=".gif"
                beforeUpload={(fileSelected) => {
                  dispatch({
                    type: 'parser/resetFile',
                    payload: {
                      file: fileSelected,
                      fileType: 'GIF',
                    },
                  });
                  return false;
                }}
                showUploadList={false}
              >
                <p><FileGifOutlined style={{fontSize: 50}} /></p>
                <p>Click or drag a gif to this area</p>
              </Upload.Dragger>
            </div>
          </Col>
          <Col span={24}>
            <div style={{height: 140}}>
              <Upload.Dragger
                accept=".mp4"
                beforeUpload={(fileSelected) => {
                  dispatch({
                    type: 'parser/resetFile',
                    payload: {
                      file: fileSelected,
                      fileType: 'VIDEO',
                    },
                  });
                  return false;
                }}
                showUploadList={false}
              >
                <p><VideoCameraAddOutlined style={{fontSize: 40}} /></p>
                <p>Click or drag a video to this area</p>
              </Upload.Dragger>
            </div>
          </Col>
        </Row>
      </Modal>
    </div>
  )
}
