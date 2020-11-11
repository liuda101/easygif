export function strToObj(str) {
  const obj = {
    color: '#000',
    offsetX: 0,
    offsetY: 0,
    blur: 0,
  };
  if (str) {
    const vs = str.split(' ');
    if (vs.length === 4) {
      obj.color = vs[0];
      obj.offsetX = parseInt(vs[1], 10);
      obj.offsetY = parseInt(vs[2], 10);
      obj.blur = parseInt(vs[3], 10);
    }
  }
  return obj;
}

export function objToStr(obj) {
  return [obj.color, obj.offsetX, obj.offsetY, obj.blur].join(' ');
}
