import { byteToBitArr, bitsToNum, readSubBlocks } from './utils';

function parseGCExt(st, block, handler) {
  st.readByte();

  const bits = byteToBitArr(st.readByte());
  block.reserved = bits.splice(0, 3);
  block.disposalMethod = bitsToNum(bits.splice(0, 3));
  block.userInput = bits.shift();
  block.transparencyGiven = bits.shift();

  block.delayTime = st.readUnsigned();
  block.transparencyIndex = st.readByte();
  block.terminator = st.readByte();

  handler.gce(block);
}

function parseComExt(st, block, handler) {
  block.comment = readSubBlocks(st);

  handler.com(block);
}

function parsePTExt(st, block, handler) {
  st.readByte();
  block.ptHeader = st.readBytes(12);
  block.ptData = readSubBlocks(st);

  handler.com(block);
}

function parseAppExt(st, block, handler) {
  function parseNetscapeExt() {
    st.readByte();
    block.unkonwn = st.readByte();
    block.iterations = st.readUnsigned();
    block.terminator = st.readByte();
  }

  function parseUnknownAppExt() {
    block.appData = readSubBlocks(st);
  }

  st.readByte();
  block.identifier = st.read(8);
  block.autCode = st.read(3);
  switch(block.identifier) {
    case 'NETSCAPE':
      parseNetscapeExt();
      break;
    default:
      parseUnknownAppExt();
      break;
  }

  handler.app(block);
}

function parseUnknownExt(st, block, handler) {
  block.data = readSubBlocks(st);

  handler.unkonwn(block);
}

export default (st, block, handler) => {
  block.label = st.readByte();
  switch(block.label) {
    case 0xF9:
      block.extType = 'gce';
      parseGCExt(st, block, handler);
      break;
    case 0xFE:
      block.extType = 'com';
      parseComExt(st, block, handler);
      break;
    case 0x01:
      block.extType = 'pte';
      parsePTExt(st, block, handler);
      break;
    case 0xFF:
      block.extType = 'app';
      parseAppExt(st, block, handler);
      break;
    default:
      block.extType = 'unkonwn';
      parseUnknownExt(st, block, handler);
      break;
  }
}