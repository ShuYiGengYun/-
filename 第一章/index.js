const _  = require('underscore');

function existy(x) {
  return x != null;
}

function truthy(x) {
  return (x !== false) && existy(x);
}


function lessOrEqual(x, y) {
  return x <= y;
}

function comparator(pred) {
  return function (x, y) {
    if (truthy(pred(x, y))) {
      return -1;
    } else if (truthy(pred(y, x))) {
      return 1;
    } else {
      return 0;
    }
  }
}

// const sortResult =  [100, 1,0, 10, -1, -2, -1].sort(comparator(lessOrEqual));
const sortResult =  [100, 1,0, 10, -1, -2, -1].sort(comparator(_.isEqual));

const csvStr = 'name, age, hair \n Merble, 35, red  \n Blob, 64, blonde ';

function lameCSV(str) {
  return _.reduce(str.split('\n'), function (table, row) {
    table.push(_.map(row.split(','), function (c) {
        return c.trim();
    }))
    return table;
  }, [])
}

const peopleTable = lameCSV(csvStr);



function doWhile(cond, action) {
  if (truthy(cond)) {
    return action()
  } else {
    return undefined;
  }
}


function executeIfHasField(target, name) {
  return doWhile(existy(target[name]), function () {
    var result = _.result(target, name);
    return result;
  })
}


const executeResult = executeIfHasField([1,2,3], 'reverse');
const executeResult2 = executeIfHasField({foo: 42}, 'foo');


/*
* 高阶函数
* 1,以一个函数作为参数
* 2,以一个函数作为结果返回
* */

const tapResult =_.tap([1, 2, 3], console.log)


var a = {
  name: 'a',
  fun: function () {
      return this;
  }
}

var bFunc = function () {
  return this;
}

var b = { name: 'b', fun: bFunc,}

const mapResult = _.map({a: 1, b: 2}, function (value, key) {
    return [key, value];
})

var nums = [100, 2, 25];

function div(x, y) {
    return x / y;
}

var reduceResult = _.reduce(nums, div);

var reduceRet = _.reduce(nums, function (acculator, currentValue) {
    return acculator / currentValue;
})

var reduceRight = _.reduceRight(nums, function (acculator, currentValue) {
    return acculator / currentValue;
})

function allOf() {
    return _.reduceRight(arguments, function (truth, f) {
        return truth && f();
    }, true)
}

function anyOf() {
    return _.reduceRight(arguments, function (truth, f) {
        return truth || f();
    }, false)
}


var people = [
  {
    name: 'Rick',
    age: 30,
  },
  {
    name:　'Jaka',
    age: 30,
  },
  {
    name: 'zengzhaoyuh',
    age: 27,
  }
]


var sortByResult = _.sortBy(people, function (p) {
  return p.age;
})

var albums = [
  {
    title: 'Sabbath Bloody Sabbath',
    gener: 'Metal'
  },
  {
    title: 'Scientist',
    gener: 'Dub'
  },
  {
    title: 'Undertow',
    gener: 'Metal'
  }
];


var groupByResult = _.groupBy(albums, function (a) {
  return a.gener;
})

var countByResult = _.countBy(albums, function (a) {
    return a.gener;
})


function cat() {
  var head = _.first(arguments);
  if (existy(head)) {
    return head.concat.apply(head, _.rest(arguments));
  } else {
    return [];
  }
}

const catResult = cat(null,[1,2,3], [4,5], [6,7,8]);


function construct(head, tail) {
  return cat([head], _.toArray(tail));
}


const constructResult = construct(42, [1,2,3,4]);

function mapcat(fun, coll) {
  return cat.apply(null, _.map(coll, fun))
}


var mapcatResult = mapcat(function (e) {
  return construct(e, [','])
}, [1, 2, 3])





