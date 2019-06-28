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
console.log(tapResult);
