// @license http://opensource.org/licenses/MIT
// copyright Paul Irish 2015


// Date.now() is supported everywhere except IE8. For IE8 we use the Date.now polyfill
//   github.com/Financial-Times/polyfill-service/blob/master/polyfills/Date.now/polyfill.js
// as Safari 6 doesn't have support for NavigationTiming, we use a Date.now() timestamp for relative values

// if you want values similar to what you'd get with real perf.now, place this towards the head of the page
// but in reality, you're just getting the delta between now() calls, so it's not terribly important where it's placed

const performance = 'performance' in window ? window.performance : {};
const dateNow = (Date.now || function () {  // thanks IE8
  return new Date().getTime();
});

let now;
if ('now' in performance == false){
  var nowOffset = dateNow();

  if (performance.timing && performance.timing.navigationStart){
    nowOffset = performance.timing.navigationStart;
  }

  now = function now(){
    return dateNow() - nowOffset;
  };
} else {
  now = performance.now.bind(performance);
}

export default now;
