require('./performance.now()-polyfill');

export default class Timer {
  constructor(deltaTimeLimit = 0.25) {
    this.microTime = performance.now();
    this.deltaTime = 0;
    this.deltaTimeLimit = deltaTimeLimit;
    this.animationFrameID = null;
  }

  cancelFrame() {
    cancelAnimationFrame(this.animationFrameID);
  }

  nextFrame(callback) {
    this.animationFrameID = requestAnimationFrame(callback);
  }

  get delta() {
    return this.deltaTime;
  }

  get fps() {
    return this.deltaTime === 0 ? 0 : 1 / this.deltaTime;
  }

  get time() {
    return this.microTime;
  }

  step() {
    const dt = (performance.now() - this.microTime) / 1000;
    this.deltaTime = Math.max(0, Math.min(this.deltaTimeLimit, dt));
    return this.microTime += dt * 1000;
  }
}
