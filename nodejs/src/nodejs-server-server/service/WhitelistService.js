'use strict';


/**
 * Get the whitelist
 * A hostname can be provided for validation
 *
 * returns Object
 **/
exports.getWhitelist = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "{}";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

