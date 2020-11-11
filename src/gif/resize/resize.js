export default (frame, sw, sh, resize) => {
  const canvas = new OffscreenCanvas(sw, sh);
  const ctx = canvas.getContext('2d');

  ctx.putImageData(frame.data, 0, 0);

  return ctx.getImageData(resize.left, resize.top, resize.width, resize.height);
}