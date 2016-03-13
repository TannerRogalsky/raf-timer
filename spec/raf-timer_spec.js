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

  describe('#nextFrame', function() {
    it('fires the callback passed on the next animation frame', function(done) {
      const timer = new RAFTimer();
      timer.nextFrame(function(dt) {
        expect(dt).toBeA('number');
        expect(dt).toBeGreaterThan(0);
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
      }, 200); // 200 is just an arbitrary value that should be much larger than any reasonable dt
    });
  });
});
