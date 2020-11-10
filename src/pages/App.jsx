import React from 'react';
import { Modal, Upload, Row, Col } from 'antd';
import { FileGifOutlined, VideoCameraAddOutlined, FileImageOutlined, createFromIconfontCN } from '@ant-design/icons';
import { useDispatch, useSelector, Link } from 'umi';
import GifTools from './components/GifTools';
import GifPlayer from './components/GifPlayer';
import GifTimeline from './components/GifTimeline';
import Banner from './components/Banner';
import Editor from './components/Editor';
import Export from './components/Export';
import styles from './app.less';

const EasyGifIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2178201_ven2ulwpcs.js',
});

const ModalTitle = () => {
  return (
    <div className={styles.modalTitle}>
      <div>Select files to begin</div>
      <Link to="/introduction">
        <EasyGifIcon type="icon-help" />
      </Link>
    </div>
  )
}

export default () => {
  const dispatch = useDispatch();
  const file = useSelector(state => state.parser.file);
  const frames = useSelector(state => state.player.frames);

  return (
    <div className={styles.app}>
      <div className={styles.canvas}>
        <GifTools />
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
        title={
          <ModalTitle />
        }
        visible={file === null}
        closable={false}
        footer={null}
      >
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <div style={{height: 120}}>
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
            <div style={{height: 120}}>
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
                <p>Click or drag a mp4 to this area</p>
              </Upload.Dragger>
            </div>
          </Col>
          <Col span={24}>
            <div style={{height: 120}}>
              <Upload.Dragger
                accept=".jpg,.jpeg,.png"
                beforeUpload={() => {
                  return false;
                }}
                multiple
                showUploadList={false}
                onChange={(v) => {
                  if (file === null) {
                    dispatch({
                      type: 'parser/resetFile',
                      payload: {
                        file: v.fileList,
                        fileType: 'PICS',
                      },
                    });
                  }
                }}
              >
                <p><FileImageOutlined style={{fontSize: 40}} /></p>
                <p>Click to select some pictures to make a gif</p>
              </Upload.Dragger>
            </div>
          </Col>
        </Row>
      </Modal>
    </div>
  )
}
