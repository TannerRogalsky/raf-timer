import now from './performance.now()-polyfill';

export default class Timer {
  constructor(deltaTimeLimit = 0.25) {
    this.microTime = now();
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
    const dt = (now() - this.microTime);
    this.deltaTime = Math.max(0, Math.min(this.deltaTimeLimit, dt / 1000));
    return this.microTime += dt;
  }
}
