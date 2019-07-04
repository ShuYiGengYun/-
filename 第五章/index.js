var _ = require('underscore');
function curry(fun) {
  return function (arg) {
    console.log(_.toArray(arguments));
    return fun(arg);
  }
}

['11', "12", "13"].map(curry(parseInt))


function curry2(fun) {
  return function (secondArg) {
    return function (firstArg) {
      return fun(firstArg, secondArg);
    }
  }
}



function div(n, d) {
  return n / d;
}

var div10  = curry2(div)(10);
div10(50);


var plays = [
    { artist: 'Burial',track: 'Archangel',},
    { artist: 'Ben Frost',track: 'Stomp',},
    { artist: 'Ben Frost',track: 'Stomp',},
    { artist: 'Burial',track: 'Archangel',},
    { artist: 'Emeralds', track: 'Snores'},
];

_.countBy(plays,  function (song) {
  return [song.artist, song.track].join('-');
})
