/* global describe, it */
let strategy = require('..');
let expect = require('chai').expect;

describe('passport-unsplash', function() {
  it('should export Strategy constructor', function() {
    expect(strategy.Strategy).to.be.a('function');
  });
    
  it('should export Strategy constructor as module', function() {
    expect(strategy).to.be.a('function');
    expect(strategy).to.equal(strategy.Strategy);
  });
  
});