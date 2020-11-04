export function gray(frames) {
  const newFrames = [];
  frames.forEach(frame => {
    const newArry = new Uint8ClampedArray(frame.data.data.length);
    const colorCount = frame.data.data.length / 4;
    for (var i = 0; i < colorCount; i++) {
      const r = frame.data.data[i * 4];
      const g = frame.data.data[i * 4 + 1];
      const b = frame.data.data[i * 4 + 2];
      const v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      newArry[i * 4] = newArry[i * 4 + 1] = newArry[i * 4 + 2] = v;
      newArry[i * 4 + 3] = frame.data.data[i * 4 + 3];
    }
    const newImgData = new ImageData(newArry, frame.data.width, frame.data.height);
    newFrames.push({
      data: newImgData,
      delay: frame.delay,
    });
  });
  return newFrames;
}

export function offsetGreen(frames) {
  const newFrames = [];
  frames.forEach(frame => {
    const newArry = new Uint8ClampedArray(frame.data.data.length);

    const offset = 35;
    for (var i = 0; i < frame.data.data.length; i += 4) {
      newArry[i] = frame.data.data[i];
      newArry[i + 1] = frame.data.data[i + 4 * offset * offset] === undefined ? 0 : frame.data.data[i + 4 * offset];
      newArry[i + 2] = frame.data.data[i + 2];
      newArry[i + 3] = frame.data.data[i + 3];
    }

    const newImgData = new ImageData(newArry, frame.data.width, frame.data.height);
    newFrames.push({
      data: newImgData,
      delay: frame.delay,
    });
  });
  return newFrames;
}

export function sunset(frames) {
  const newFrames = [];
  frames.forEach(frame => {
    const newArry = new Uint8ClampedArray(frame.data.data.length);

    const offset = 35;
    for (var i = 0; i < frame.data.data.length; i += 4) {
      newArry[i] = frame.data.data[i];
      newArry[i + 1] = frame.data.data[i + 1] + 50;
      newArry[i + 2] = frame.data.data[i + 2] + 12;
      newArry[i + 3] = frame.data.data[i + 3];
    }

    const newImgData = new ImageData(newArry, frame.data.width, frame.data.height);
    newFrames.push({
      data: newImgData,
      delay: frame.delay,
    });
  });
  return newFrames;
}