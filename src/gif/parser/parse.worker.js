/* eslint-disable no-restricted-globals */
import doParse from './doParse';

self.onmessage = function onmessage(event) {
  if (event.data.action === 'BEGIN_PARSE') {
    doParse(event.data.data, {
      onProgress(current, total) {
        self.postMessage({
          action: 'PROGRESS',
          current,
          total,
        });
      },
      onParseDone(frames, previewFrames) {
        self.postMessage({
          action: 'SUCCESS',
          data: {
            frames,
            previewFrames,
          }
        });
      },
      onHdr(hdr) {
        self.postMessage({
          action: 'HDR',
          data: hdr,
        });
      }
    });
  }
};
