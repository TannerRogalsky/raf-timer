import now from './performance.now()-polyfill';
import {requestAnimationFrame, cancelAnimationFrame} from './requestAnimationFrame-polyfill';

const callbacks = {};
const runCallbacks = function(dt) {
  for (const key in callbacks) {
    callbacks[key](dt);
  }
};

let numCallbacks = 0;
let callbackID = 0;
let animationFrameID = null;

export default class Timer {
  constructor(deltaTimeLimit = 0.25) {
    this.microTime = now();
    this.deltaTime = 0;
    this.deltaTimeLimit = deltaTimeLimit;
    this.animationFrameID = null;
  }

  cancelFrame() {
    delete callbacks[this.animationFrameID];

    if (numCallbacks === 0) {
      cancelAnimationFrame(animationFrameID);
    }
  }

  nextFrame(callback) {
    const id = callbackID++;
    numCallbacks++;
    callbacks[id] = callback;
    this.animationFrameID = id;

    if (animationFrameID === null) {
      animationFrameID = requestAnimationFrame(runCallbacks);
    }
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
