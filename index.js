'use strict';

var isArray = Array.isArray || function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};

var isObject = function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
};

var isFunction = function isFunction(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
};

var has = function (obj, key) {
    if (typeof key !== 'string') {
        return false;
    }
    if (['object', 'function'].indexOf(typeof obj) > -1) {
        return Object.keys(obj).concat(Object.keys(obj.constructor.prototype)).indexOf(key) > -1;
    }
    return false;
};

/**
 * constructor
 * @param {String} key the key to search on
 */
function KeyFilter(key) {
    if (!(this instanceof KeyFilter)) {
        return new KeyFilter(key);
    }
    Object.defineProperty(this, 'key', {
        get: function () {
            return key;
        }
    });
}

function equivalent(a, b) {
    return (a === b || Number(a) === Number(b)) || (String(a) === String(b));
}

function get(item, key) {
    if (!item) {
        return undefined;
    }
    return item[key] || (item.get && item.get(key));
}


KeyFilter.prototype.eq = function (value) {
    var key = this.key;
    return function (item) {
        return equivalent(get(item, key), value);
    };
};

/**
 * does this object have the given key at all
 * @return Boolean
 */
KeyFilter.prototype.exists = function () {
    var key = this.key;
    return function (item) {
        return has(item, key);
    };
};

/**
 * is the thing the thing
 * @param  {Mixed} value
 * @return Boolean
 */
KeyFilter.prototype.is = function (value) {
    var key = this.key;
    return function (item) {
        return get(item, key) === value;
    };
};

KeyFilter.prototype.identity = function () {
    var key = this.key;
    return function (item) {
        return get(item, key);
    };
};

KeyFilter.prototype.not = function (value) {
    var key = this.key;
    return function (item) {
        return get(item, key) !== value;
    };
};

KeyFilter.prototype.truthy = function () {
    var key = this.key;
    return function (item) {
        return !!get(item, key);
    };
};
KeyFilter.prototype.falsy = function () {
    var key = this.key;
    return function (item) {
        return !get(item, key);
    };
};


KeyFilter.prototype.include = function (values) {
    var args = isArray(values) ? values : [].slice.call(arguments),
        key = this.key;
    return function (item) {
        var itemval = get(item, key);
        return args.indexOf(itemval) > -1;
    };
};

KeyFilter.prototype.exclude = function (values) {
    var args = isArray(values) ? values : [].slice.call(arguments),
        key = this.key;
    return function (item) {
        var itemval = get(item, key);
        return args.indexOf(itemval) === -1;
    };
};

KeyFilter.has = has;

module.exports = KeyFilter;
