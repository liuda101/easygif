import { flip } from './t.js';
import filterMap from './filter.js';

self.onmessage = function (e) {
  if (e.data.action === 'flip') {
    var newFrames = flip(e.data.frames, e.data.width, e.data.height, e.data.flip);
    self.postMessage({
      action: 'TRANSFORM_SUCCESS',
      data: newFrames,
    });
  } else if (e.data.action === 'filter') {
    const filterFn = filterMap[e.data.filter];
    if (filterFn) {
      var newFrames = filterFn(e.data.frames);
      self.postMessage({
        action: 'TRANSFORM_SUCCESS',
        data: newFrames,
      });
    }
  }
}