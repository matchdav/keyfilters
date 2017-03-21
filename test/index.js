/*global
    describe,
    it,
    Promise
*/
'use strict';

var KeyFilter = require('..');
var assert = require('assert');

var humans = [{
    name: 'Joe',
    cat: undefined,
    dog: null,
    age: '42'
}, {
    name: 'Dave',
    cat: 'Sartre',
    dog: 'Amadeus',
    age: 42
}, {
    name: 'Pete',
    cat: 'Nietzche'
}, {
    name: 'Joe',
    dog: 'Heimlich'
}];

var age = new KeyFilter('age');
var cat = new KeyFilter('cat');
var dog = new KeyFilter('dog');
var name = new KeyFilter('name');

describe('KeyFilter', function () {
    describe('methods', function () {
        it('#exists', function () {
            assert(humans.filter(dog.exists()).length === 3);
            assert(humans.filter(cat.exists()).length === 3);
            assert(humans.filter(name.exists()).length === 4);
        });
        it('#include', function () {
            assert(humans.filter(cat.include('Sartre')).length === 1);
            assert(humans.filter(cat.include('Sartre', 'Nietzche')).length === 2);
            assert(humans.filter(cat.include(['Sartre', 'Nietzche'])).length === 2);
        });
        it('#exclude', function () {
            assert(humans.filter(cat.exclude('Sartre')).length === 3);
            assert(humans.filter(cat.exclude('Sartre', 'Nietzche')).length === 2);
            assert(humans.filter(cat.exclude(['Sartre', 'Nietzche'])).length === 2);
        });
        it('#eq', function () {
            assert(humans.filter(age.eq(42)).length === 2);
            assert(humans.filter(age.eq('42')).length === 2);
        });
        it('#is', function () {
            assert(humans.filter(age.is(42)).length === 1);
            assert(humans.filter(age.is('42')).length === 1);
        });
        it('#not', function () {
            assert(humans.filter(age.not(42)).length === 3);
            assert(humans.filter(age.not('42')).length === 3);
        });
        it('#truthy', function () {
            assert(humans.filter(age.truthy()).length === 2);
        });
        it('#identity', function () {
            assert(humans.filter(age.identity()).length === 2);
        });
        it('#falsy', function () {
            assert(humans.filter(age.falsy()).length === 2);
        });
    });
});
