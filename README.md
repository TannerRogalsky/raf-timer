# raf-timer
An abstraction around requestionAnimationFrame.

The purposed of this library is to provide a thin wrapper around `requestionAnimationFrame`. It provides a polyfill as well as, essentially, a memoization of the callback.

## API

### `class Timer(deltaTimeLimit = 0.25)`
Instantiates a Timer class which restricts the timer step to not more than the `deltaTimeLimit` provided.

### `Timer.nextFrame(callback)`
Tells the `Timer` to schedule the specified callback for execution the next time an animation frame event fire.

### `Timer.cancelFrame()`
Tells the `Timer` to cancel a scheduled callback.

### `Timer.step()`
Increments the `delta` value associated with the timer.

### `Timer.delta`
The amount of time passed since the previous frame (in seconds).

### `Timer.fps`
The number of frames per second based on the value in `delta`.

### `Timer.time`
The number of milliseconds elapsed since this timer was instantiated.
