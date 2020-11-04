function parseBlock(st, handler) {
  const block = {};
  block.sentinel = st.readByte();
  switch (String.fromCharCode(block.sentinel)) {
    case '!':
      block.type = 'ext';
      parseExt(st, block, handler);
      break;
    case ',':
      block.type = 'img';
      parseImg(st, block, handler);
      break;
    case ';':
      block.type = 'eof';
      handler.eof();
      break;
    default:
      throw new Error('Unkonwn block: 0x' + block.sentinel.toString(16));
  }
  if (block.type !== 'eof') {
    setTimeout(parseBlock(st, handler), 0);
  }
}
