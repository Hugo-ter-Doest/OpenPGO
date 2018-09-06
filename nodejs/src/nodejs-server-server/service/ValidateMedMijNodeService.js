'use strict';


/**
 * Validate hostname
 * A hostname is provided for validation
 *
 * name String Hostname that should be validated
 * returns Boolean
 **/
exports.findHostByName = function(name) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = true;
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

