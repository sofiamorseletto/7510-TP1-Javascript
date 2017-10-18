var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');


describe("Interpreter", function () {

    var incompleteDb = [
        "varon(juan).",
        "varon(pepe).",
        "varon(hector).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "mujer(cecilia).",
        "padre",
        "padre(juan, pepa).",
        "padre(hector, maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "hija(X, Y) :- mujer(X), padre(Y, X)."
    ];

    var interpreter = null;

    before(function () {
        // runs before all tests in this block
    });

    after(function () {
        // runs after all tests in this block
    });

    beforeEach(function () {
        // runs before each test in this block
        interpreter = new Interpreter();
        interpreter.parseDB(incompleteDb);
    });

    afterEach(function () {
        // runs after each test in this block
    });


    describe('Incomplete Database Fact Test', function () {

        it('varon(juan) should be null', function () {
            assert(interpreter.checkQuery('varon(juan)') === null);
        });

        it('varon(maria) should be null', function () {
            assert(interpreter.checkQuery('varon(maria)') === null);
        });

        it('mujer(cecilia) should be null', function () {
            assert(interpreter.checkQuery('mujer(cecilia)') === null);
        });

        it('padre(juan, pepe) should be null', function () {
            assert(interpreter.checkQuery('padre(juan, pepe)') === null);
        });

        it('padre(mario, pepe) should be null', function () {
            assert(interpreter.checkQuery('padre(mario, pepe)') === null);
        });

    });

    describe('Incomplete Database Rule Test', function () {

        it('hijo(pepe, juan) should be null', function () {
            assert(interpreter.checkQuery('hijo(pepe, juan)') === null);
        });
        it('hija(maria, roberto) should be null', function () {
            assert(interpreter.checkQuery('hija(maria, roberto)') === null);
        });
        it('hijo(pepe, juan) should be null', function () {
            assert(interpreter.checkQuery('hijo(pepe, juan)') === null);
        });

    });


});