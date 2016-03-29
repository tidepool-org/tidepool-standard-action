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

var every = require('lodash.every');
var isError = require('lodash.iserror');
var isPlainObject = require('lodash.isplainobject');
var isString = require('lodash.isstring');

var allowedKeys = ['type', 'error', 'payload', 'meta'];

function isAllowedKey(key) {
  return allowedKeys.indexOf(key) !== -1;
}

function isTSA(action) {
  var actionIsPlainObject = isPlainObject(action);

  var actionContainsOnlyAllowedKeys = every(
    Object.keys(action),
    function(key) { return isAllowedKey(key); }
  );

  var typeIsString = isString(action.type);

  // default to true since `error` is optional
  var errorIsJSError = true;
  if (action.error) {
    errorIsJSError = isError(action.error);
  }

  // default to true since `payload` and `meta` are optional
  var payloadIsPlainObject = true, metaIsPlainObject = true;
  if (action.payload) {
    payloadIsPlainObject = isPlainObject(action.payload);
  }
  if (action.meta) {
    metaIsPlainObject = isPlainObject(action.meta);
  }

  var propertiesAreValid = typeIsString && errorIsJSError && payloadIsPlainObject && metaIsPlainObject;

  return actionIsPlainObject && actionContainsOnlyAllowedKeys && propertiesAreValid;
}

module.exports = isTSA;
