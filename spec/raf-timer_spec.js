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
});
