export default class Sketch {
  constructor({ canvas = null, width = window.innerWidth, height = window.innerHeight } = {}) {
    this._canvas = canvas;
    this._ctx = null;
    this._width = width;
    this._height = height;
    this._devicePixelRatio = window.devicePixelRatio || 1;
    this._rafRef = null;
    this._previousTimestamp = 0;
    this._isRunning = false;
    this._loopHandler = this._loop.bind(this);
    this._resizeHandler = this.resize.bind(this);

    this._updateCallback = null;
    this._drawCallback = null;
    this._setupCallback = null;

    this._backgroundColor = "#f2f2f2";

    // window.addEventListener("resize", this._resizeHandler);
  }

  _init() {
    if (this._isRunning) {
      console.warn("Sketch is already running.");
      return;
    }

    if (!this._canvas) {
      this._canvas = document.createElement("canvas");
      document.body.appendChild(this._canvas);
    }

    this._ctx = this._canvas.getContext("2d");
    if (!this._ctx) {
      throw new Error("Unable to initialize 2D context.");
    }

    // Set initial dimensions for canvas
    this.resize();

    if (this._setupCallback) this._setupCallback();

    // Start loop
    this._isRunning = true;
    this._rafRef = requestAnimationFrame(this._loopHandler);
  }

  _loop(currentTimestamp) {
    if (!this._isRunning) return;
    const elapsed = currentTimestamp - this._previousTimestamp;
    const dt = elapsed / 1000;
    if (this._updateCallback) this._updateCallback(dt);
    if (this._drawCallback) this._drawCallback();
    this._previousTimestamp = currentTimestamp;
    this._rafRef = requestAnimationFrame(this._loopHandler);
  }

  setup(callback) {
    this._setupCallback = callback;
    this._init();
    return this;
  }

  update(callback) {
    this._updateCallback = callback;
    return this;
  }

  draw(callback) {
    this._drawCallback = callback;
    return this;
  }

  resize(width = this._width, height = this._height) {
    const newDevicePixelRatio = window.devicePixelRatio || 1;
    if (this._devicePixelRatio !== newDevicePixelRatio) {
      this._devicePixelRatio = newDevicePixelRatio;
    }
    // Set rendering dimensions
    this._canvas.style.width = `${width}px`;
    this._canvas.style.height = `${height}px`;

    // Set logical dimensions
    this._canvas.width = Math.floor(width * this._devicePixelRatio);
    this._canvas.height = Math.floor(height * this._devicePixelRatio);

    this._ctx.setTransform(this._devicePixelRatio, 0, 0, this._devicePixelRatio, 0, 0); // Reset transformations

    this._width = width;
    this._height = height;
  }

  pause() {
    if (!this._isRunning) return;
    this._isRunning = false;
    cancelAnimationFrame(this._rafRef);
    this._rafRef = null;
  }

  resume() {
    if (this._isRunning) return;
    this._isRunning = true;
    this._previousTimestamp = performance.now();
    this._rafRef = requestAnimationFrame(this._loopHandler);
  }

  destroy() {
    if (this._isRunning) this.pause();
    this._isRunning = false;
    this._canvas.remove();
    this._canvas = null;
    this._ctx = null;
    window.removeEventListener("resize", this._resizeHandler);
  }

  clear() {
    this._ctx.fillStyle = this._backgroundColor;
    this._ctx.fillRect(0, 0, this._width, this._height);
  }

  getCenterPos() {
    return { x: this._width / 2, y: this._height / 2 };
  }

  get canvas() {
    return this._canvas;
  }
  set canvas(value) {
    this._canvas = value;
  }

  get ctx() {
    return this._ctx;
  }
  set ctx(value) {
    this._ctx = value;
  }

  get width() {
    return this._width;
  }
  set width(value) {
    this._width = value;
  }

  get height() {
    return this._height;
  }
  set height(value) {
    this._height = value;
  }

  get backgroundColor() {
    return this._backgroundColor;
  }
  set backgroundColor(value) {
    this._backgroundColor = value;
  }

  get devicePixelRatio() {
    return this._devicePixelRatio;
  }
}
