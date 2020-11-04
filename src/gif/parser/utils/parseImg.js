import { byteToBitArr, bitsToNum, parseCT, readSubBlocks } from './utils';
import lzwDecode from './lzwDecode';

export default (st, img, handler) => {
  // 图像位置信息
  img.leftPos = st.readUnsigned();
  img.topPos = st.readUnsigned();
  img.width = st.readUnsigned();
  img.height = st.readUnsigned();

  const bits = byteToBitArr(st.readByte());
  // 是否使用本地调色盘
  img.lctFlag = bits.shift();
  img.interlaced = bits.shift();
  img.sorted = bits.shift();
  img.reserved = bits.splice(0, 2);
  img.lctSize = bitsToNum(bits.splice(0, 3));

  if (img.lctFlag) {
    img.lct = parseCT(st, 1 << (img.lctSize + 1));
  }

  img.lzwMinCodeSize = st.readByte();

  const lzwData = readSubBlocks(st);
  img.pixels = lzwDecode(img.lzwMinCodeSize, lzwData);

  if (img.interlaced) {
    console.log('interlaced');
  }

  // TODO interlaced
  // if (img.interlaced) {
  //   img.pixels = deinterlace(img.pixels, img.width);
  // }

  handler.img(img);
}