import previewFrame from './previewFrame';

function draw(img, w, h) {
  const canvas = new OffscreenCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const imgData = ctx.getImageData(0, 0, img.width, img.height);
  const largeData = previewFrame(imgData, img.width, img.height, w, h);
  const previewData = previewFrame(imgData, img.width, img.height, 80, 120);
  return {
    largeData,
    previewData,
  };
}

function parseImg(img, w, h) {
  return new Promise((resolve) => {
    fetch(img.src).then(res => res.blob()).then(blob => createImageBitmap(blob)).then(theImage => {
      resolve(draw(theImage, w, h));
    });
  });
}

function parse(result, images, index, width, height) {
  if (index >= images.length) {
    self.postMessage({
      action: 'FINISHED',
      result,
    });
  } else {
    self.postMessage({
      action: 'PROGRESS',
      percent: (index + 1) / images.length,
    });
    parseImg(images[index], width, height).then(pr => {
      result.push(pr);
      parse(result, images, index + 1, width, height);
    });
  }
}

self.onmessage = (e) => {
  const {
    images,
    width,
    height,
  } = e.data;

  const result = [];
  parse(result, images, 0, width, height);
}