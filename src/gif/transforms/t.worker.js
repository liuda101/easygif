import { flip } from './t.js';
import filterMap from './filter.js';
import rotate from './rotate';
import previewFrame from '../parser/previewFrame';

self.onmessage = function (e) {
  if (e.data.action === 'flip') {
    var newFrames = flip(e.data.frames, e.data.width, e.data.height, e.data.flip);
    var newPreviewFrames = flip(e.data.previewFrames, 80, 120, e.data.flip);
    self.postMessage({
      action: 'TRANSFORM_SUCCESS',
      data: {
        frames: newFrames,
        previewFrames: newPreviewFrames,
      }
    });
  } else if (e.data.action === 'filter') {
    const filterFn = filterMap[e.data.filter];
    if (filterFn) {
      var newFrames = filterFn(e.data.frames);
      var newPreviewFrames = filterFn(e.data.previewFrames);
      self.postMessage({
        action: 'TRANSFORM_SUCCESS',
        data: {
          frames: newFrames,
          previewFrames: newPreviewFrames,
        }
      });
    }
  } else if (e.data.action === 'rotate') {
    var newFrames = [];
    var newPreviewFrames = [];
    e.data.frames.forEach((frame, index) => {
      const pd = rotate(e.data.previewFrames[index], 80, 120, e.data.delta);
      newFrames.push({
        data: rotate(frame, e.data.width, e.data.height, e.data.delta)
      });
      newPreviewFrames.push({
        data: previewFrame(pd, pd.width, pd.height, 80, 120),
      });
    });
    self.postMessage({
      action: 'TRANSFORM_SUCCESS',
      data: {
        frames: newFrames,
        previewFrames: newPreviewFrames,
      }
    });
  }
}