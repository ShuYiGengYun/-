var  _ = require('underscore');
var maxResult = _.max([1,2,3,4,5,6]);

var people = [
  {
    name: 'Fred',
    age: 23,
  },
  {
    name: 'Lucy',
    age: 30,
  }
];
var maxResult2 = _.max(people, function (p) {
    return p.age;
})

function finder(valueFun, bestFun, coll) {
  return _.reduce(coll, function (best, current) {
    var bestValue = valueFun(best);
    var currentValue = valueFun(current);

    return (bestValue === bestFun(bestValue, currentValue)) ? best : current;
  })
}


var finderResult = finder(_.identity, Math.max, [1, 2, 3, 4, 5]);



function repeat(times, VALUE) {
  return _.map(_.range(times), function () {
    return VALUE;
  })
}


var repeatResult = repeat(4, 'Major');


function repeatedly(times, fun) {
  return _.map(_.range(times), fun);
}

var repeatedlyResult = repeatedly(3, function () {
  return Math.floor((Math.random() * 10) + 1);
})


function iterateUntil(fun, check, init) {
  var ret = [];
  var result = fun(init);

  while (check(result)){
    ret.push(result);
    result = fun(result);
  }
  return ret;
}

iterateUntil(function (n) {
  return n + n;
}, function (n) {
  return n < 1024;
}, 1);



function always(VALUE) {
  return function () {
    return VALUE;
  }
}

function existy(x) {
  return x != null;
}


function fnull(fun) {
  var defaults = _.rest(arguments);
  return function () {
    var args = _.map(arguments, function (e, i) {
      if (!existy(e)) {
        console.log(i);
      }
      return existy(e) ? e : defaults[i];
    });
    return fun.apply(null, args);
  }
}


var nums = [1, 2, 3, null, 5];
var safeMult = fnull(function (total, n) {
  return total * n;
}, 1,1);

var result = _.reduce(nums, safeMult);


function defaults(d) {
  return function (o, k) {
    var value = fnull(_.identity, d[k]);
    return  o && value(o[k]);
  }
}


function doSomething(config) {
  var lookup = defaults({ config: 108});
  return lookup(config, 'critical');
}

var dosomethingResult1 = doSomething({ critical: 9});
var dosomethingResult2 = doSomething({ });
console.log(dosomethingResult1);
console.log(dosomethingResult2);
