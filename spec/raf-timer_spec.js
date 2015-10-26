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
});
