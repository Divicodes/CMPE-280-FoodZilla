const {describe, it, assert, expect, check, reset} = require("../index");

describe("Mocha Expect", () => {
	it("Exports all the mocha functions", () => {
		expect(1);
		assert.ok(true, "This ran which means it is working");
	});
	
	it("Correctly identifies when the expected count doesn't match the actual count", () => {
		expect(1);
		
		if (check(true) === false) {
			// This is correct
			reset();
			assert.ok(true);
		} else {
			reset();
			assert.ok(false);
		}
	});
	
	it("Correctly identifies when the expected count does match the actual count", () => {
		expect(1);
		assert.ok(true);
		
		if (check(true) === true) {
			// This is correct
			reset();
			assert.ok(true);
		} else {
			reset();
			assert.ok(false);
		}
	});
});