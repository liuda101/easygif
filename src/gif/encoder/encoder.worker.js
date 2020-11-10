import GIFEncoder from './GIFEncoder';

self.onmessage = function onmessage(event) {
  const {
    width,
    height,
    frames,
    delay,
    repeat,
  } = event.data;

  const encoder = new GIFEncoder();
  // Repeat
  encoder.setRepeat(repeat ? 0 : 1);
  encoder.setDelay(delay);
  encoder.setSize(width, height);
  encoder.start();
  frames.forEach((frame, index) => {
    encoder.addFrame(frame.data, true);
    self.postMessage({
      action: 'PROGRESS',
      percent: ((index + 1) / frames.length) * 100
    });
  });
  encoder.finish();

  self.postMessage({
    action: 'FINISHED',
    data: encoder.stream(),
  });
}