# raf-timer
An abstraction around requestionAnimationFrame.

The purposed of this library is to provide a thin wrapper around `requestionAnimationFrame`. It provides a polyfill as well as, essentially, a memoization of the callback.

## API

### `class Timer()`
Instantiates a Timer class.

### `Timer.nextFrame(callback)`
Tells the `Timer` to schedule the specified callback for execution the next time an animation frame event fire.

### `Timer.cancelFrame()`
Tells the `Timer` to cancel a scheduled callback.
