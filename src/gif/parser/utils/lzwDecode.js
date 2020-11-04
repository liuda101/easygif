export default (minCodeSize, data) => {
  let pos = 0;

  function readCode(size) {
    let code = 0;
    for (let i = 0; i < size; i ++) {
      if (data.charCodeAt(pos >> 3) & (1 << (pos & 7))) {
        code |= 1 << i;
      }
      pos ++;
    }
    return code;
  }

  let output = [];

  let clearCode = 1 << minCodeSize;
  let eoiCode = clearCode + 1;

  let codeSize = minCodeSize + 1;

  let dict = [];

  function clear() {
    dict = [];
    codeSize = minCodeSize + 1;
    for (let i = 0; i < clearCode; i++) {
      dict[i] = [i];
    }
    dict[clearCode] = [];
    dict[eoiCode] = null;
  }

  let code;
  let last;

  while(true) {
    last = code;
    code = readCode(codeSize);

    if (code === clearCode) {
      clear();
      continue;
    }

    if (code === eoiCode) {
      break;
    }

    if (code < dict.length) {
      if (last !== clearCode) {
        dict.push(dict[last].concat(dict[code][0]));
      }
    } else {
      if (code !== dict.length) {
        throw new Error('Invalid LZW code.');
      }

      dict.push(dict[last].concat(dict[last][0]));
    }

    output.push.apply(output, dict[code]);

    if (dict.length === (1 << codeSize) && codeSize < 12) {
      codeSize ++;
    }
  }

  return output;
}