import {requestAnimationFrame, cancelAnimationFrame} from './requestAnimationFrame-polyfill';

let numCallbacks = 0;
let callbackID = 0;
let internalRAFID = null;

let previousCallbackTime = Date.now();
const callbacks = {};
const runCallbacks = function(time) {
  internalRAFID = null;

  const dt = time - previousCallbackTime;
  for (const key in callbacks) {
    const timer = callbacks[key];

    timer.callback(dt);

    delete timer.callback;
    delete callbacks[key];
  }
  previousCallbackTime = time;
};

export default class Timer {
  constructor() {
    this.animationFrameID = null;
  }

  cancelFrame() {
    delete callbacks[this.animationFrameID];

    if (numCallbacks === 0) {
      cancelAnimationFrame(internalRAFID);
      internalRAFID = null;
    }
  }

  nextFrame(callback) {
    const id = callbackID++;
    numCallbacks++;
    this.callback = callback;
    callbacks[id] = this;
    this.animationFrameID = id;

    if (internalRAFID === null) {
      internalRAFID = requestAnimationFrame(runCallbacks);
    }
  }
}
