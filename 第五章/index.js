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



function toHex(n) {
  var hex = n.toString(16);
  return (hex.length < 2) ? [0, hex].join('') : hex;
}

function rgbToHexString(r, g, b) {
  return ['#', toHex(r), toHex(g), toHex(b)].join('');
}

// console.log(rgbToHexString(255, 255, 255));





function partial1(fun, arg1) {
  return function (/* args */) {

  }
}


var isntString = _.compose(function (x) {
  return !x
}, _.isString);

var isntStringResult = isntString([]);
console.log(isntStringResult);
