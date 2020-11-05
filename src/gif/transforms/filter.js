import { randomNum } from './helpers';

function _doFilter(frames, filterFn) {
  const newFrames = [];
  frames.forEach(frame => {
    const newArry = new Uint8ClampedArray(frame.data.data.length);

    filterFn(newArry, frame);

    const newImgData = new ImageData(newArry, frame.data.width, frame.data.height);
    newFrames.push({
      data: newImgData,
      delay: frame.delay,
    });
  });
  return newFrames;
}

export default {
  gray(frames) {
    return _doFilter(frames, (rgbAry, frame) => {
      const colorCount = frame.data.data.length / 4;
      for (var i = 0; i < colorCount; i++) {
        const r = frame.data.data[i * 4];
        const g = frame.data.data[i * 4 + 1];
        const b = frame.data.data[i * 4 + 2];
        const v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        rgbAry[i * 4] = rgbAry[i * 4 + 1] = rgbAry[i * 4 + 2] = v;
        rgbAry[i * 4 + 3] = frame.data.data[i * 4 + 3];
      }
    });
  },

  eclectic(frames) {
    return _doFilter(frames, (rgbAry, frame) => {
      for (var i = 0; i < frame.data.data.length; i += 4) {
        let random = randomNum(0, 200);
        let addtion = 0;
        if (random > 0 && random < 50) {
          addtion = 30;
        } else if (random > 49 && random < 100) {
          addtion = 90;
        } else {
          addtion = 10;
        }
        rgbAry[i] = frame.data.data[i];
        rgbAry[i + 1] += addtion;
        rgbAry[i + 2] = frame.data.data[i + 2];
        rgbAry[i + 3] = frame.data.data[i + 3];
      }
    });
  },

  offset(frames) {
    return _doFilter(frames, (rgbAry, frame) => {
      const offset = 35;
      for (var i = 0; i < frame.data.data.length; i += 4) {
        rgbAry[i] = frame.data.data[i];
        rgbAry[i + 1] = frame.data.data[i + 4 * offset * offset] === undefined ? 0 : frame.data.data[i + 4 * offset];
        rgbAry[i + 2] = frame.data.data[i + 2];
        rgbAry[i + 3] = frame.data.data[i + 3];
      }
    });
  },

  sunset(frames) {
    return _doFilter(frames, (rgbAry, frame) => {
      for (var i = 0; i < frame.data.data.length; i += 4) {
        rgbAry[i] = frame.data.data[i];
        rgbAry[i + 1] = frame.data.data[i + 1] + 50;
        rgbAry[i + 2] = frame.data.data[i + 2] + 12;
        rgbAry[i + 3] = frame.data.data[i + 3];
      }
    });
  },
}