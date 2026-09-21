class Utils {
  static randomGaussian(mean = 0, standardDeviation = 1) {
    let u1 = Math.random();
    let u2 = Math.random();

    // Box-Muller transform
    let z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);

    // Adjust by mean and standard deviation
    return z0 * standardDeviation + mean;
  }

  static randomHexCode() {
    let hexCode = "#";
    for (let i = 0; i < 3; i++) {
      let randomNum = Math.floor(Math.random() * 256);
      hexCode += randomNum.toString(16).padStart(2, "0");
    }
    return hexCode;
  }

  static map(value, currentMin, currentMax, newMin, newMax) {
    const currentProgress = value / (currentMax - currentMin);
    return newMin + (newMax - newMin) * currentProgress;
  }

  static RGBtoHex(r, g, b) {
    r = r ?? 255;
    g = g ?? r;
    b = b ?? g;
    return "#" + r.toString(16).padStart(2, "0") + g.toString(16).padStart(2, "0") + b.toString(16).padStart(2, "0");
  }

  static lerp(min, max, progress) {
    return min + (max - min) * progress;
  }

  static constrain(value, min, max) {
    return Math.max(Math.min(value, max), min);
  }

  static randomFloat(min, max) {
    return min + (max - min) * Math.random();
  }

  static randomInt(min, max) {
    return Math.floor(min + (max - min + 1) * Math.random());
  }
}

export default Utils;
