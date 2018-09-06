'use strict';

var utils = require('../utils/writer.js');
var Whitelist = require('../service/WhitelistService');

module.exports.getWhitelist = function getWhitelist (req, res, next) {
  Whitelist.getWhitelist()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
