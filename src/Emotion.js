export default class Emotion {
  constructor(title, imagePath, imageCount) {
    this.title = title;
    this._images = [];
    this._index = 0;
    this._timer = 0;
    this._waitTime = 0.12;
    this._width = 400;
    this._height = 600;
    this._imagePath = imagePath;
    this._imageCount = imageCount;
  }

  update(dt) {
    this._timer += dt;
    if (this._timer >= this._waitTime) {
      this._timer -= this._waitTime;
      this._index++;
      if (this._index >= this._images.length) {
        this._index = 0;
      }
    }
  }

  draw(sk) {
    const nextImage = this._images[this._index];
    if (!nextImage) return;
    sk.ctx.drawImage(nextImage, 0, 0, sk.canvas.width / sk.devicePixelRatio, sk.canvas.height / sk.devicePixelRatio);
  }

  loadImages() {
    this._images.length = 0;
    for (let i = 1; i <= this._imageCount; i++) {
      const img = new Image();
      img.src = `${this._imagePath}img-${i}.jpg`;
      this._images.push(img);
    }
  }

}