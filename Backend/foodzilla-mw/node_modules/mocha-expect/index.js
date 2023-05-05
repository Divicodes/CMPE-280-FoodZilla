// We include and export mocha so you can just use this lib without having
// to include mocha directly, e.g. const {describe, it} = require('mocha-expect');
const mocha = require("mocha");
const originalAssert = require("assert");

let _expectedAssertionCount = 0;
let _actualAssertionCount = 0;

const expect = function expect (val) {
	_expectedAssertionCount = val;
};

const reset = function () {
	_expectedAssertionCount = undefined;
	_actualAssertionCount = 0;
};

const expectedCount = () => {
	return _expectedAssertionCount;
};

const assertionCount = () => {
	return _actualAssertionCount;
};

const incrementAssertionCount = function () {
	_actualAssertionCount++;
};

const check = function check (cb, test) {
	if (typeof cb !== "function") {
		test = cb;
		cb = undefined;
	}
	
	if (_expectedAssertionCount === undefined || _expectedAssertionCount === _actualAssertionCount) {
		if (cb) { cb(); }
		return true;
	}
	
	if (test) {
		if (cb) { cb(); }
		return false;
	}
	
	const err = new Error("expected " + _expectedAssertionCount + " assertions, got " + _actualAssertionCount);
	this.currentTest.emit("error", err);
};

// Loop the functions in assert library and wrap them
const assert = {};

for (const i in originalAssert) {
	if (originalAssert.hasOwnProperty(i)) {
		if (typeof originalAssert[i] === "function") {
			// Copy the function as a wrap
			assert[i] = (...args) => {
				incrementAssertionCount();
				return originalAssert[i](...args);
			};
		}
	}
}

if (!mocha.beforeEach) {
	throw new Error("You are attempting to run mocha tests without using the mocha CLI. None of the mocha functions (describe, it, beforeEach etc) have been injected into this Node.js process so we cannot continue. Please run mocha as described in the documentation.");
}

mocha.beforeEach(reset);
mocha.afterEach(check);

module.exports = {
	...mocha,
	check,
	reset,
	expect,
	assert,
	expectedCount,
	assertionCount
};