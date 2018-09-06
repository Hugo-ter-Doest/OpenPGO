'use strict';

var utils = require('../utils/writer.js');
var ValidateMedMijNode = require('../service/ValidateMedMijNodeService');

module.exports.findHostByName = function findHostByName (req, res, next) {
  var name = req.swagger.params['name'].value;
  ValidateMedMijNode.findHostByName(name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
