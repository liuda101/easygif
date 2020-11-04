export function flip(frames, w, h, xy) {
  const newFrames = [];

  const canvas = new OffscreenCanvas(w, h);
  const ctx = canvas.getContext('2d');

  const newCanvas = new OffscreenCanvas(w, h);
  const newCtx = newCanvas.getContext('2d');
  if (xy === 'x') {
    newCtx.scale(-1, 1);
  } else {
    newCtx.scale(1, -1);
  }

  frames.forEach(frame => {
    const {data} = frame;
    ctx.putImageData(data, 0, 0);

    if (xy === 'x') {
      newCtx.drawImage(canvas, -w, 0);
    } else {
      newCtx.drawImage(canvas, 0, -h);
    }

    newFrames.push({
      data: newCtx.getImageData(0, 0, w, h),
      delay: frame.delay,
    });
  });

  return newFrames;
}