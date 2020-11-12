import React, { useState, useCallback } from 'react';
import { Modal, Upload, Button } from 'antd';
import { useSelector } from 'umi';
import Worker from '@/gif/parser/parsePics.worker.js';

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        resolve({
          src: reader.result,
          width: img.width,
          height: img.height,
        });
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export default ({
  onGotFrame,
}) => {
  const size = useSelector(state => state.player.size);
  const [loading, setLoading] = useState(false);

  const handleFileSelected = useCallback(
    (file) => {
      setLoading(true);
      readFile(file).then(result => {
        const worker = new Worker();
        worker.postMessage({
          images: [result],
          width: size.width,
          height: size.height,
        });
        worker.onmessage = (e) => {
          if (e.data.action === 'FINISHED') {
            result = null;
            onGotFrame(e.data.result);
            worker.terminate();
          }
        };
      });
    },
    [size],
  );


  return (
    <Modal
      visible
      title="Add Frame"
    >
      <Upload
        accept=".jpg,.jpeg,.png"
        beforeUpload={e => {
          handleFileSelected(e);
          return false;
        }}
        showUploadList={false}
      >
        <Button loading={loading}>Select a picture</Button>
      </Upload>
    </Modal>
  )
}