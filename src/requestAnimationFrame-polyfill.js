// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

export let requestAnimationFrame = window.requestAnimationFrame;
export let cancelAnimationFrame = window.cancelAnimationFrame;

let lastTime = 0;
let vendors = ['ms', 'moz', 'webkit', 'o'];
for(var x = 0; x < vendors.length && !requestAnimationFrame; ++x) {
  requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
  cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                             || window[vendors[x]+'CancelRequestAnimationFrame'];
}

if (!requestAnimationFrame) {
  requestAnimationFrame = function(callback, element) {
    let currTime = new Date().getTime();
    let timeToCall = Math.max(0, 16 - (currTime - lastTime));
    let id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}

if (!cancelAnimationFrame) {
  cancelAnimationFrame = function(id) {
      clearTimeout(id);
  };
}
