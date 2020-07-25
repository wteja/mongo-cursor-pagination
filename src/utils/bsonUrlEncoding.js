const { EJSON } = require('bson');
const base64url = require('base64-url');

/**
 * These will take a BSON object (an database result returned by the MongoDB library) and
 * encode/decode as a URL-safe string.
 */

module.exports.encode = function(obj) {
  let jsonEncoded;
  if (typeof obj !== 'object') {
    // In the special case that a string is passed in, use JSON instead of ESON, as EJSON
    // can only encode objects. EJSON.parse, however, can decode strings properly, so there's no
    // need to special case below.
    jsonEncoded = JSON.stringify(obj);
  } else {
    jsonEncoded = EJSON.stringify(obj);
  }
  return base64url.encode(jsonEncoded);
};

module.exports.decode = function(str) {
  return EJSON.parse(base64url.decode(str));
};
