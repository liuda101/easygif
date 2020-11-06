class Parser {
  constructor(video, width, height, handler) {
    this.video = video;
    this.width = width;
    this.height = height;
    this.handler = handler;
    this.frames = [];
    const canvas = new OffscreenCanvas(width, height);
    this.ctx = canvas.getContext('2d');
  }

  _parseFrame() {
    if (this.video.ended) {
      this.handler.onParseFinished(this.frames);
      return;
    }
    this._computeFrame();
    setTimeout(() => {
      this._parseFrame();
    }, 16);
  }

  _computeFrame() {
    this.ctx.drawImage(this.video, 0, 0, this.width, this.height);
    this.frames.push({
      data: this.ctx.getImageData(0, 0, this.width, this.height),
      delay: 160,
    });
  }

  beginParse() {
    this._parseFrame();
  }
};

export default (video, {
  width,
  height,
}, handler) => {
  const parser = new Parser(video, width, height, handler);
  parser.beginParse();
}