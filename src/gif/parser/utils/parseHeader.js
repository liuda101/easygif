import { byteToBitArr, bitsToNum, parseCT } from './utils';

export default function parseHeader(st, handler) {
  const hdr = {};
  // 图片类型，固定为 GIF
  hdr.sig = st.read(3);
  // 版本，gif 有两种：86a，89a，目前绝大部分都是89a，提供了对透明色和多帧动画的支持
  hdr.ver = st.read(3);

  if (hdr.sig !== 'GIF') {
    throw new Error('Not a GIF file.');
  }

  // 图像宽度
  hdr.width = st.readUnsigned();
  // 图像高度
  hdr.height = st.readUnsigned();

  const bits = byteToBitArr(st.readByte());
  // 是否有全局调色盘
  hdr.gctFlag = bits.shift();
  // 分辨率
  hdr.colorRes = bitsToNum(bits.splice(0, 3));
  // 调色盘是否排序
  hdr.sorted = bits.shift();
  // 调色盘的大小
  hdr.gctSize = bitsToNum(bits.splice(0, 3));

  // 背景颜色在全局颜色列表中的索引（不是 RGB，是索引）
  hdr.bgColorIndex = st.readByte();

  // 像素宽高比
  hdr.pixelAspectRatio = st.readByte();

  // 如果有全局调色盘，则获取全局调色盘
  if (hdr.gctFlag) {
    // 全局调色盘大小：3 * 2 ^ (gctSize + 1)
    hdr.gct = parseCT(st, 1 << (hdr.gctSize + 1));
  }
  
  handler.hdr(hdr);

  return hdr;
}