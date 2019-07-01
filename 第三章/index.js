var _ = require('underscore');
var globals = {};

function makeBindFn(resolver) {
  return function (k, v) {
    var stack = globals[k] || [];
    globals[k] = resolver(stack, v);
    return globals;
  }
}

var stackBinder = makeBindFn(function (stack, v) {
  stack.push(v);
  return stack;
});

var stackUnBinder = makeBindFn(function (stack, v) {
  stack.pop();
  return stack;
})



var dynamicLookup = function(k) {
  var slot = globals[k] || [];
  return _.last(slot);
}

stackBinder('a', 1);
stackBinder('b', function () {
  console.log(1);
});

stackBinder('a', 2);

var dynamicResult = dynamicLookup('a')






/*
* bind的用法
* */

var module = {
  x: 81,
  getX: function () {
    return this.x;
  }
};


var unboundGetX = module.getX;


global.x = 9;

var retieveX = module.getX;
var boundGetX = retieveX.bind(module);



/*
* 偏函数
* */

function list() {
  return Array.prototype.slice.call(arguments);
}


function addArguments(arg1, arg2) {
  return arg1 + arg2;
}


var list1 = list(1, 2, 3);

var result1 = addArguments(1, 2);


var leadingThirtySevenList = list.bind(null, 37);
var addThirtySeven = addArguments.bind(null, 37);

var list2 = leadingThirtySevenList(1,2,3);
var list3 = addThirtySeven(5, 10);

/*
*配合setTimeOut,绑定this，防止丢失
* */


/*
* 作为构造函数使用的绑定的函数
* */
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return 'toString:' + this.x  + '，'+ this.y;
};

var p = new Point(1, 2);

var emptyObj = {};
var YAxiosPoint = Point.bind(emptyObj, 0);
var YAxiosPoint = Point.bind(null, 0);
var axiosPoint = new YAxiosPoint(8);
console.log(axiosPoint instanceof YAxiosPoint);
console.log(axiosPoint instanceof Point);
console.log(new Point(1,2) instanceof YAxiosPoint);





/*
* 手写一个bind函数
* */

if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }
    /*获取除oThis之外的参数*/
    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          // this instanceof fBound === true时,说明返回的fBound被当做new的构造函数调用
          return fToBind.apply(this instanceof fBound
              ? this
              : oThis,
              // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
              aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    // 维护原型关系
    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      fNOP.prototype = this.prototype;
    }
    // 下行的代码使fBound.prototype是fNOP的实例,因此
    // 返回的fBound若作为new的构造函数,new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的实例
    fBound.prototype = new fNOP();

    return fBound;
  };
}










