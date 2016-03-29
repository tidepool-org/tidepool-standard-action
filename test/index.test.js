/**
 * Copyright (c) 2016, Tidepool Project
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the associated License, which is identical to the BSD 2-Clause
 * License as published by the Open Source Initiative at opensource.org.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the License for more details.
 *
 * You should have received a copy of the License along with this program; if
 * not, you can obtain one from Tidepool Project at tidepool.org.
 */

var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

var isTSA = require('../lib/');

describe('isTSA', function() {
  it('should exist', function() {
    expect(isTSA).to.exist;
  });

  it('should be a function', function() {
    assert.isFunction(isTSA);
  });

  describe('valid TSAs', function() {
    it('an action object consisting of only a `type` field', function() {
      expect(isTSA({type: 'TYPE'})).to.be.true;
    });

    it('an action object consisting of `type` and `error` fields', function() {
      expect(isTSA({type: 'TYPE', error: new Error(':(')})).to.be.true;
    });

    it('an action object consisting of `type` and `payload` fields', function() {
      expect(isTSA({type: 'TYPE', payload: {a: 1}})).to.be.true;
    });

    it('an action object consisting of `type` and `meta` fields', function() {
      expect(isTSA({type: 'TYPE', meta: {a: 1}})).to.be.true;
    });

    it('an action object consisting of `type`, `payload`, and `meta` fields', function() {
      expect(isTSA({type: 'TYPE', payload: {a: 1}, meta: {2: 'b'}})).to.be.true;
    });
  });

  describe('invalid TSAs', function() {
    it('an action that is not a plain object', function() {
      expect(isTSA([1,2,3])).to.be.false;
    });

    it('an action object without a `type`', function() {
      expect(isTSA({})).to.be.false;
    });

    it('an action object with a non-string `type`', function() {
      expect(isTSA({type: 5})).to.be.false;
      expect(isTSA({type: {}})).to.be.false;
    });

    it('an action object that has a disallowed key', function() {
      expect(isTSA({
        type: 'FOO',
        payload: {foo: 'bar'},
        error: new Error(':('),
        meta: {abc: 123},
        baz: {foo: 'bar'}
      })).to.be.false;
    });

    it('an action object with a non-Error `error` field', function() {
      expect(isTSA({
        type: 'FOO',
        error: ':('
      })).to.be.false;
    });

    it('an action object with a `payload` field that is not a plain object', function() {
      expect(isTSA({
        type: 'FOO',
        payload: 'bar'
      })).to.be.false;
    });

    it('an action object with a `meta` field that is not a plain object', function() {
      expect(isTSA({
        type: 'FOO',
        meta: 'bar'
      })).to.be.false;
    });
  });
});
