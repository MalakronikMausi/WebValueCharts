/*
* @Author: aaronpmishkin
* @Date:   2016-05-24 09:56:10
* @Last Modified by:   aaronpmishkin
* @Last Modified time: 2016-05-25 15:47:51
*/

// Import DiscreteDomain, the class to be tested.
import { DiscreteDomain } from '../../app/resources/model/DiscreteDomain';

// Chai (and therefore the function 'expect') is injected by Karma AFTER the typescript code is compiled. This means that TypeScript looks 
// for a declarations for expect before there is one. This statement declares expect as a variable in the namespace, but still allows it to 
// be overwritten when Chai is injected. This isn't necessary, but fixes the annoying compiler errors.
declare var expect: any;

// This declares the test suite for the DiscreteDomain class
describe('DiscreteDomain', () => {
	var discreteDomain: DiscreteDomain = new DiscreteDomain(false);

	// This declares the test suite for the getElements method of DiscreteDomain. # will be used before method names by convention...
	describe('#getElements()', () => {
		
		// This runs before all of the it() functions within the describe/context function are executed (NOT before the context functions).
		before(function() {
			discreteDomain = new DiscreteDomain(false);
		});
		// This declares a sub test suite for the getElements method. "context" is just an alias for "describe".
		context('when domain is empty', () => {
			// An actual test case that runs. Code not in an "it" (or "before", or "beforeEach", etc) block will NOT run. 
			// Don't try to put initialization code between "it" blocks in a context function.
			it('should return an empty array', () => {
				expect(discreteDomain.getElements()).to.have.length(0);
			});
		});


		context('when domain has one element', () => {
			it('should return an array with just that element', () => {
				discreteDomain.addElement('sunny');
				expect(discreteDomain.getElements()).to.have.length(1);
				expect(discreteDomain.getElements()[0]).to.equal('sunny');
			});
		});


		context('when domain has two elements', () => {
			it('should return an array with both the elements', () => {
				discreteDomain.addElement('rainy');
				expect(discreteDomain.getElements()).to.have.length(2);
				expect(discreteDomain.getElements()[0]).to.equal('sunny');
				expect(discreteDomain.getElements()[1]).to.equal('rainy');
			});
		});
	});

	describe('#addElement(element: string)', () => {
		
		before(function() {
			discreteDomain = new DiscreteDomain(false);
			discreteDomain.addElement('sunny');
			discreteDomain.addElement('rainy');
		});

		context('when element is present in domain', () => {
			it('should not add the element again', () => {
				expect(discreteDomain.getElements()).to.have.length(2);
				discreteDomain.addElement('sunny');
				expect(discreteDomain.getElements()).to.have.length(2);
			});
		});

		context('when element is NOT present in domain', () => {
			it('should add the new element', () => {
				expect(discreteDomain.getElements()).to.have.length(2);
				discreteDomain.addElement('cloudy');
				expect(discreteDomain.getElements()).to.have.length(3);
				expect(discreteDomain.getElements()[2]).to.equal('cloudy');
			});
		});
	});

	describe('#removeElement(element: string)', () => {
		
		before(function() {
			discreteDomain = new DiscreteDomain(false);
			discreteDomain.addElement('sunny');
			discreteDomain.addElement('rainy');
		});

		context('when element is NOT present in domain', () => {
			it('should not do anything', () => {
				expect(discreteDomain.getElements()).to.have.length(2);
				discreteDomain.removeElement('cloudy');
				expect(discreteDomain.getElements()).to.have.length(2);
			});
		});

		context('when element is present in the domain', () => {
			it('should remove the element', () => {
				expect(discreteDomain.getElements()).to.have.length(2);
				discreteDomain.removeElement('sunny');
				expect(discreteDomain.getElements()).to.have.length(1);
				expect(discreteDomain.getElements()[0]).to.equal('rainy');
			});

			it('should remove the element even if that leaves the domain empty', () => {
				discreteDomain.removeElement('rainy');
				expect(discreteDomain.getElements()).to.have.length(0);
			});
		});
	});

	describe('#setOrdered(ordered: boolean)', () => {
		before(function() {
			discreteDomain = new DiscreteDomain(false);
		})

		it('should be able to set the domain to be ordered', () => {
			expect(discreteDomain.getOrdered()).to.equal(false);
			discreteDomain.setOrdered(true);
			expect(discreteDomain.getOrdered()).to.equal(true);
		});

		it('should be able to set the domain to be un-ordered', () => {
			expect(discreteDomain.getOrdered()).to.equal(true);
			discreteDomain.setOrdered(false);
			expect(discreteDomain.getOrdered()).to.equal(false);
		});

	});
});




