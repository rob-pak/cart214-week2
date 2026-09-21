export default class Vector {
  constructor(x = 0, y = 0) {
    this._x = x;
    this._y = y;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  set x(x) {
    this._x = x;
  }

  set y(y) {
    this._y = y;
  }

  add(Vector) {
    this._x += Vector.x;
    this._y += Vector.y;
    return this;
  }

  subtract(Vector) {
    this._x -= Vector.x;
    this._y -= Vector.y;
    return this;
  }

  multiply(n) {
    this._x *= n;
    this._y *= n;
    return this;
  }

  divide(n) {
    if (n !== 0) {
      this._x /= n;
      this._y /= n;
      return this;
    } else throw new Error("Cannot divide by zero.");
  }

  magnitude() {
    return Math.sqrt(this._x ** 2 + this._y ** 2);
  }

  normalize() {
    const m = this.magnitude();
    if (m > 0) {
      this.divide(m);
    }
    return this;
  }

  limit(max) {
    if (this.magnitude() > max) {
      this.normalize().multiply(max);
    }
    return this;
  }

  static clone(v) {
    return new Vector(v.x, v.y);
  }

  static fromAngle(angle, length = 1) {
    return new Vector(length * Math.cos(angle), length * Math.sin(angle));
  }

  static random2D() {
    return this.fromAngle(Math.random() * Math.PI * 2);
  }

  static add(v, u) {
    return new Vector(v.x + u.x, v.y + u.y);
  }

  static subtract(v, u) {
    return new Vector(v.x - u.x, v.y - u.y);
  }

  static multiply(v, n) {
    return new Vector(v.x * n, v.y * n);
  }

  static divide(v, n) {
    if (n !== 0) {
      return new Vector(v.x / n, v.y / n);
    } else throw new Error("Cannot divide by zero.");
  }
}
