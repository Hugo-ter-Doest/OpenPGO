/*
SOAP/XML client for MedMij whitelist parsing
Copyright (C) 2018 Hugo W.L. ter Doest

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

"use strict";


var _ = require('underscore');

var constants = require('constants');
var soap = require('soap');
var portNumber = 8000;
var host = 'http://localhost';
var path = '/whitelist?wsdl';
var url = host + ':' + portNumber + path;

var settings = require('./clientSettings.json');
var DEBUG = settings.debug;


// Constructor
function Client(clientOptions, callback) {
  if (clientOptions) {
    // Override settings 
    settings = _.extend(settings, clientOptions);
  }
  DEBUG && console.log('Client settings: ' + JSON.stringify(settings, null, 2));
  soap.createClient(settings.wsdlPath, function(err, client) {
    if (err) {
      console.log(err);
    }
    else {
      // Create endpoint URL and set it
      var endPoint = (settings.TLS ? "https://" : "http://") + 
        settings.hostname + 
        ':' + settings.portNumber + '/' +
        settings.servicePath;
      DEBUG && console.log('Setting the endpoint of the client to ' + endPoint);
      client.setEndpoint(endPoint);
      if (settings.TLS) {
        if (settings.twoSided) {
          var options = {};
          client.setSecurity(new soap.ClientSSLSecurity(
            settings.clientKeyPath,
            settings.clientCertPath,
            settings.clientCAPath,
            options
          ));
        }
        else {
          var options = {
            rejectUnauthorized: false,
            // strictSSL allows us to work with a self-signed certificate
            strictSSL: false,
            secureOptions: constants.SSL_OP_NO_TLSv1_2
          };
          client.setSecurity(new soap.ClientSSLSecurity(
            null,
            null,
            settings.clientCAPath,
            options
          ));
        }
      }
      callback(client);
    }
  });
}

module.exports = Client;