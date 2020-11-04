import Stream from './stream';
import parseHeader from './utils/parseHeader';
import parseExt from './utils/parseExt';
import parseImg from './utils/parseImg';

// GIF 数据格式说明 https://www.jianshu.com/p/38743ef278ac

function base64ToUnit8Array(base64Str) {
  let pureBase64 = base64Str.substring('data:image/gif;base64,'.length);
  let padding = '='.repeat((4 - pureBase64.length % 4) % 4);
  let base64 = (pureBase64 + padding).replace(/\-/g, '+').replace(/_/g, '/');
  let rawData = atob(base64);
  let outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

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

export default (base64Str, {
  onProgress,
  onParseDone,
  onHdr,
}) => {
  const u8a = base64ToUnit8Array(base64Str);
  const stream = new Stream(u8a);
  let hdr;

  function doNothing() {}

  let tmpCanvas = null;
  function doHdr(hdr) {
    tmpCanvas = new OffscreenCanvas(hdr.width, hdr.height);
    onHdr(hdr);
  }

  function withProgress(fn) {
    return (block) => {
      fn(block);
      onProgress(stream.pos, stream.data.length);
    }
  }

  let transparency = null;
  let delay = null;
  let lastDisposalMethod = null;
  let disposalMethod = null;
  let disposalRestoreFromIdx = null;
  let frame = null;
  let frames = [];
  let frameOffsets = [];
  let lastImg = null;
  function clear() {
    transparency = null;
    delay = null;
    lastDisposalMethod = disposalMethod;
    disposalMethod = null;
    frame = null;
  }
  function doGCE(gce) {
    // debugger;
    putFrame();
    clear();
    transparency = gce.transparencyGiven ? gce.transparencyIndex : null;
    delay = gce.delayTime;
    disposalMethod = gce.disposalMethod;
  }

  function putFrame() {
    if (!frame) return;
    frames.push({
      data: frame.getImageData(0, 0, hdr.width, hdr.height),
      delay: delay,
    });
    frameOffsets.push({x: 0, y: 0});
  }

  function doImg(img) {
    if (!frame) {
      frame = tmpCanvas.getContext('2d');
    };

    var currIdx = frames.length;
    var ct = img.lctFlag ? img.lct : hdr.gct;

    if (currIdx > 0) {
      if (lastDisposalMethod === 3) {
        if (disposalRestoreFromIdx !== null) {
          frame.putImageData(frames[disposalRestoreFromIdx].data, 0, 0);
        } else {
          frame.clearRect(lastImg.leftPos, lastImg.topPos, lastImg.width, lastImg.height);
        }
      } else {
        disposalRestoreFromIdx = currIdx - 1;
      }

      if (lastDisposalMethod === 2) {
        frame.clearRect(lastImg.leftPos, lastImg.topPos, lastImg.width, lastImg.height);
      }
    }

    var imgData = frame.getImageData(img.leftPos, img.topPos, img.width, img.height);
    img.pixels.forEach((pixel, i) => {
      if (pixel !== transparency) {
        imgData.data[i * 4 + 0] = ct[pixel][0];
        imgData.data[i * 4 + 1] = ct[pixel][1];
        imgData.data[i * 4 + 2] = ct[pixel][2];
        imgData.data[i * 4 + 3] = 255;
      }
    });
    frame.putImageData(imgData, img.leftPos, img.topPos);
    lastImg = img;
  }

  const handler = {
    hdr: withProgress(doHdr),

    gce: withProgress(doGCE),
    com: withProgress(doNothing),
    pte: withProgress(doNothing),
    app: withProgress(doNothing),
    unkonwn: withProgress(doNothing),

    img: withProgress(doImg),

    eof: withProgress(function() {
      putFrame();
      onParseDone(frames)
    })
  };

  // 配置信息
  hdr = parseHeader(stream, handler);

  // 配置和图片信息
  parseBlock(stream, handler);
}