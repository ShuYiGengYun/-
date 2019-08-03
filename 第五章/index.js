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

var div10 = curry2(div)(10);
div10(50);


var plays = [
    {artist: 'Burial', track: 'Archangel',},
    {artist: 'Ben Frost', track: 'Stomp',},
    {artist: 'Ben Frost', track: 'Stomp',},
    {artist: 'Burial', track: 'Archangel',},
    {artist: 'Emeralds', track: 'Snores'},
];

_.countBy(plays, function (song) {
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
        var args = construct(arg1, arguments);
        return fun.apply(fun, args);
    }
}


var isntString = _.compose(function (x) {
    return !x
}, _.isString);

var isntStringResult = isntString([]);
// console.log(isntStringResult);


var influences = [
    ['Lisp', 'Smalltalk'],
    ['Lisp', 'Scheme'],
    ['Smalltalk', 'Self'],
    ['Scheme', 'JavaScript'],
    ['Scheme', 'Lua'],
    ['Self', 'Lua'],
    ['Self', 'JavaScript']
]
function construct(head, tail) {
    return cat([head], _.toArray(tail));
}


function nexts(graph, node) {
    if (_.isEmpty(graph)) {
        return []
    }
    var pair = _.first(graph); // 取出第一项;
    var from = _.first(pair); // 取出第一项的第一个元素;
    var to = second(pair); // 取出第一项的第二个元素;
    var more = _.rest(graph); // 剩余项;

    if (_.isEqual(node, from)) {
        return construct(to, nexts(more, node)) // 第一项和传入的值相等就取第二项的值;
    } else {
        return nexts(more, node) //第一项和传入的值不相等,就继续取下一项 如此循环,直到数组为空;
    }
}

/**
 * 先验证是否为数字再验证是否为偶数;
 * @returns {function(): *}
 */

function andify() {
    var preds = _.toArray(arguments);
    return function (/* args */) {
        var args = _.toArray(arguments);
        var everything = function (ps, truth) {
            if (_.isEmpty(ps)) {
                return truth;
             } else {
                return _.every(args, _.first(ps)) && everything(_.rest(ps), truth);
            }

        }
        return everything(preds, true)
    }
}


function isEven(x) {
    return x % 2 === 0;
}

var evenNums = andify(_.isNumber, isEven)

var result = evenNums(4,2,6,8)


function orify(/* preds */) {
    var preds = _.toArray(arguments);
    return function (/* args */) {
        var args = _.toArray(arguments);
        var somethings = function (ps, truth) {
            if (_.isEmpty(ps)) {
                return truth
            } else {
                return _.some(args, _.first(ps)) || somethings(_.rest(ps), truth);
            }
        }
        return somethings(preds, false)
    }
}


var orifyBool = orify(_.isNumber, isEven)
var orifyResult = orifyBool(2,4,6);


function evenSteven(n) {
    if (n === 0) {
        return true;
    } else {
        return oddJohn(Math.abs(n) - 1)
    }
}


function oddJohn(n) {
    if (n === 0) {
        return false;
    } else {
        return evenSteven(Math.abs(n) -1)
    }
}

var evenStevenRes = evenSteven(2)


function existy(x) {
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


function flat(array) {
    if (_.isArray(array)) {
        return cat.apply(cat, _.map(array, flat))
    } else {
        return [array]
    }
}

var flatResult = flat([1,2,3, [4, 5, [6]]])



/* 深度克隆 */
var x = [{ a: [1, 2, 3], b: 42}, { c: { d: []}}];
var y = deepClone(x)


function deepClone(obj) {
    if (!existy(obj) || !_.isObject(obj)) {
        return obj;
    }
    var temp = new obj.constructor();
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            temp[key] = deepClone(obj[key])
        }
    }
    return temp;
}

function visit(mapFun, resultFun, array) {
    if (_.isArray(array)) {
        return resultFun(_.map(array, mapFun))
    } else {
        return resultFun(array)
    }
}

var visitResult = visit(_.isNumber, _.identity, [1, 2, null, 3]);

function postDepth(fun, ary) {
    return visit(partial1(postDepth, fun), fun, ary)
}


function preDepth(fun, ary) {
    return visit(partial1(preDepth, fun), fun, fun(ary))
}

function evenOline(n) {
    if (n === 0) {
        return true
    } else {
        return partial1(oddOline, Math.abs(n) - 1)
    }
}

function oddOline(n) {
    if (n === 0) {
        return false
    } else {
        return partial1(evenOline, Math.abs(n) - 1)
    }
}


function trampoline(fun) {
    var result = fun.apply(fun, _.rest(arguments))
    while (_.isFunction(result)){
        result = result()
    }
    return result;
}


var trampolineResult = trampoline(oddOline, 3)
console.log(trampolineResult);

