import expect from 'expect';
import RAFTimer from '../src/index';

describe('RAFTimer', function(){
  it('exists', function(){
    expect(RAFTimer).toExist();
  });

  it('can be intantiated', function(){
    const instance = new RAFTimer();
    expect(instance).toExist();
    expect(instance).toBeA(RAFTimer);
  });

  describe('#step', function(){
    it('increments the time(ms) by the delta(s)', function(done) {
      const timer = new RAFTimer();
      const previousTime = timer.time;
      process.nextTick(function(){
        timer.step();
        const newTime = timer.time;

        expect(previousTime).toBeLessThan(newTime);
        expect(newTime - previousTime).toEqual(timer.delta * 1000);

        done();
      }, 15);
    });
  });

  describe('#nextFrame', function() {
    it('fires the callback passed on the next animation frame', function(done) {
      const timer = new RAFTimer();
      timer.nextFrame(function() {
        done();
      });
    });
  });

  describe('#cancelFrame', function() {
    it('cancels a scheduled callback', function(done) {
      const timer = new RAFTimer();
      let hasRun = false;
      timer.nextFrame(function() {
        hasRun = true;
        expect(true).toEqual(false);
      });
      timer.cancelFrame();
      setTimeout(function() {
        expect(hasRun).toEqual(false);
        done();
      }, 200);
    });
  });
});
