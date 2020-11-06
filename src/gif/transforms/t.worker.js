import { flip } from './t.js';
import filterMap from './filter.js';

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
  }
}