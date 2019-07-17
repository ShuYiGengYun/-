const _ = require('underscore');

var existy = function existy(x) {
  return x != null;
}

function cat() {
  var head = _.first(arguments);
  if (existy(head)) {
    return head.concat.apply(head, _.rest(arguments));
  } else {
    return [];
  }
}

 function myLength(arg) {
  if (_.isEmpty(arg)) {
    return 0;
  } else {
    return 1 + myLength(_.rest(arg));
  }
}

function cycle(times, ary){
   if (times <= 0) {
     return [];
   } else {
     return cat(ary, cycle(times - 1, ary))
   }
}

var cycleResult = cycle(2, [1,2,3]);


var zipResult = _.zip(['a', 'b', 'c'], [1, 2, 3]);
console.log(zipResult);

module.exports = {
  myLength,
  existy,
  cat,
};
