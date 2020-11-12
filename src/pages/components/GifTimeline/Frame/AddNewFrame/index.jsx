import React, { useState, useCallback, useEffect } from 'react';
import { Modal, Upload, Button } from 'antd';
import { useSelector } from 'umi';
import Worker from '@/gif/parser/parsePics.worker.js';
import filesToImgs from '@/utils/filesToImgs';

export default ({
  onGotFrame,
  onCancel,
}) => {
  const size = useSelector(state => state.player.size);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState(null);

  useEffect(
    () => {
      if (files) {
        setLoading(true);
        filesToImgs(files).then(result => {
          const worker = new Worker();
          worker.postMessage({
            images: result,
            width: size.width,
            height: size.height,
          });
          worker.onmessage = (e) => {
            if (e.data.action === 'FINISHED') {
              console.log(e.data.result);
              result = null;
              onGotFrame(e.data.result);
              worker.terminate();
            }
          };
        });
      }
    },
    [files, size],
  );


  return (
    <Modal
      visible
      title="Add Frames"
      footer={null}
      onCancel={onCancel}
    >
      <Upload
        accept=".jpg,.jpeg,.png"
        beforeUpload={e => {
          return false;
        }}
        showUploadList={false}
        multiple
        onChange={(e) => {
          setFiles(e.fileList);
        }}
      >
        <Button loading={loading}>Choose pictures to add</Button>
      </Upload>
    </Modal>
  )
}