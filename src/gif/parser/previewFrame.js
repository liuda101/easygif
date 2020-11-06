export default (frameData, sw, sh, dw, dh) => {
  const canvas = new OffscreenCanvas(sw, sh);
  const ctx = canvas.getContext('2d');
  ctx.putImageData(frameData, 0, 0);

  const sRatio = sw / sh;
  const dRatio = dw / dh;

  let mw, mh;
  if (sRatio > dRatio) {
    mh = dh;
    mw = sRatio * mh;
  } else {
    mw = dw;
    mh = mw / sRatio;
  }
  const dCanvas = new OffscreenCanvas(mw, mh);
  const dCtx = dCanvas.getContext('2d');
  dCtx.drawImage(canvas, 0, 0, sw, sh, 0, 0, mw, mh);
  return dCtx.getImageData((mw - dw) / 2, (mh - dh) / 2, dw, dh);
}