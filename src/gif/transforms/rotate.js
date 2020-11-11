export default function rotate(frame, w, h, delta) {
  const canvas = new OffscreenCanvas(w, h);
  const ctx = canvas.getContext('2d');
  ctx.putImageData(frame.data, 0, 0);

  let realAngle = 0;
  if (delta > 0) {
    realAngle = delta % 360;
  } else if (delta < 0) {
    realAngle = 360 - Math.abs(delta % 360);
  }

  if (realAngle === 0) {
    return frame.data;
  }

  console.log(delta, realAngle);

  if (delta === 90) {
    const rotateCanvas = new OffscreenCanvas(h, w);
    const rotateCtx = rotateCanvas.getContext('2d');
    rotateCtx.save();
    rotateCtx.translate(h/2, w/2);
    rotateCtx.rotate(Math.PI / 180 * realAngle);
    rotateCtx.drawImage(canvas, -w/2, -h/2);
    rotateCtx.restore();
    return rotateCtx.getImageData(0, 0, h, w);
  } else if (delta === 180) {
    const rotateCanvas = new OffscreenCanvas(w, h);
    const rotateCtx = rotateCanvas.getContext('2d');
    rotateCtx.save();
    rotateCtx.translate(w/2, h/2);
    rotateCtx.rotate(Math.PI / 180 * realAngle);
    rotateCtx.drawImage(canvas, -w/2, -h/2);
    rotateCtx.restore();
    return rotateCtx.getImageData(0, 0, w, h);
  } else {
    const rotateCanvas = new OffscreenCanvas(h, w);
    const rotateCtx = rotateCanvas.getContext('2d');
    rotateCtx.save();
    rotateCtx.translate(h/2, w/2);
    rotateCtx.rotate(Math.PI / 180 * realAngle);
    rotateCtx.drawImage(canvas, -w/2, -h/2);
    rotateCtx.restore();
    return rotateCtx.getImageData(0, 0, h, w);
  }
}