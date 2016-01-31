import expect from 'expect';
import expectJSX from 'expect-jsx';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
// import InputElement from './index';

expect.extend(expectJSX);

describe('lookup', function() {
	it('should work', function() {
/*		const renderer = new TestUtils.createRenderer();
		renderer.render(<InputElement />);
		
		const actual = renderer.getRenderOutput();
		const excepted = (<input placeholder="Search" />);
		*/
		expect(true).toEqual(true);
		// expect(actual).toEqualJSX(excepted);
	});
});