export function bitsToNum(bits) {
  return bits.reduce((s, n) => s * 2 + n, 0);
}

export function byteToBitArr(bite) {
  const a = [];
  for (let i = 7; i >= 0; i--) {
    a.push(!!(bite & (1 << i)));
  }
  return a;
}

export function parseCT(st, n) {
  const ct = [];
  for (let i = 0; i < n; i++) {
    ct.push(st.readBytes(3));
  }
  return ct;
}

export function readSubBlocks(st) {
  let size, data;
  data = '';
  do {
    size = st.readByte();
    data += st.read(size);
  } while (size !== 0);

  return data;
}
