import resizeFrame from './resize';
import previewFrame from '../parser/previewFrame';

self.onmessage = (e) => {
  const {
    frames,
    width,
    height,
    resize,
  } = e.data;

  const result = [];
  frames.forEach((frame, index) => {
    const resizeData = resizeFrame(frame, width, height, resize);
    const previewData = previewFrame(resizeData, resize.width, resize.height, 80, 120);
    result.push({
      frame: resizeData,
      preview: previewData,
    });
    self.postMessage({
      action: 'PROGRESS',
      percent: (index + 1) / frames.length,
    });
  });

  self.postMessage({
    action: 'FINISHED',
    data: result,
  });
}