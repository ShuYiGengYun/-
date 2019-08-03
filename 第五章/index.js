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
            return everything(preds, true);

        }
    }
}













