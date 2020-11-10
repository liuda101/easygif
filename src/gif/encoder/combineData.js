function parseImg(img) {
  return new Promise((resolve) => {
    fetch(img).then(res => res.blob()).then(blob => createImageBitmap(blob)).then(theImage => {
      resolve(theImage);
    });
  });
}

export default (frameData, fabricData, w, h) => {
  const canvas = new OffscreenCanvas(w, h);
  const ctx = canvas.getContext('2d');
  ctx.putImageData(frameData, 0, 0);
  return new Promise((resolve) => {
    parseImg(fabricData).then(fd => {
      ctx.drawImage(fd, 0, 0);
      resolve(ctx.getImageData(0, 0, w, h));
    });
  });
};