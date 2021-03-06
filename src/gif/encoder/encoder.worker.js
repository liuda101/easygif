import GIFEncoder from './GIFEncoder';
import combineData from './combineData';

function addFrame(encoder, frames, fabricDataList, width, height, index, done) {
  if (index >= frames.length) {
    done();
  } else {
    combineData(frames[index].data, fabricDataList[index], width, height).then(newData => {
      encoder.addFrame(newData, true);
      addFrame(encoder, frames, fabricDataList, width, height, index + 1, done);
      self.postMessage({
        action: 'PROGRESS',
        percent: ((index + 1) / frames.length) * 100
      });
    });
  }
}

self.onmessage = function onmessage(event) {
  const {
    width,
    height,
    frames,
    fabricDataList,
    delay,
    repeat,
  } = event.data;

  const encoder = new GIFEncoder();
  // Repeat
  encoder.setRepeat(repeat ? 0 : 1);
  encoder.setDelay(delay);
  encoder.setSize(width, height);
  encoder.start();

  addFrame(encoder, frames, fabricDataList, width, height, 0, () => {
    encoder.finish();

    self.postMessage({
      action: 'FINISHED',
      data: encoder.stream(),
    });
  });
}