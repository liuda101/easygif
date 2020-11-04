/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
export default class Stream {
  constructor(data) {
    this.data = data;
    this.len = this.data.length;
    this.pos = 0;
  }

  readByte() {
    if (this.pos >= this.data.length) {
      throw new Error('Attempted to read past end of stream.');
    }

    return this.data[this.pos++];
  }

  readBytes(n) {
    const bytes = [];
    for (let i = 0; i < n; i++) {
      bytes.push(this.readByte());
    }
    return bytes;
  }

  read(n) {
    let s = '';
    for (let i = 0; i < n; i++) {
      s += String.fromCharCode(this.readByte());
    }
    return s;
  }

  readUnsigned() {
    const a = this.readBytes(2);
    // 双字节数据使用 little-endian 格式保存
    return (a[1] << 8) + a[0];
  }
};
