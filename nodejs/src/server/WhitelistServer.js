/*
SOAP/XML server class for MedMij whitelist parsing
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

const DEBUG = true;

const useTLS = false;
const authenticateClient = false;

var fs = require('fs');
var util = require('util');
var soap = require('soap');
var http = require('http');
var https = require('https');

var xmllint = require('node-xmllint');
var xml2js = require('xml2js');

var _ = require('underscore');

var settings = require('./serverSettings.json');

var whitelistJSON = null;


// Reads the whitelist XML, the XSD and validates
function readAndValidateWhitelist(callback) {
  // Read whitelist
  var whitelist = fs.readFileSync(settings.whitelistPath, 'utf8');
  DEBUG && console.log('Whitelist read');
  // Read schema
  var schema = fs.readFileSync(settings.whitelistSchemaPath, {encoding: 'utf-8'});
  DEBUG && console.log('Whitelist schema read');

  // Validate using node xmllint
  var result = xmllint.validateXML({
    xml: whitelist,
    schema: schema
  });
  if (result.errors) {
    console.error('Whitelist does not conform to schema, exiting ...');
    // Exit
    process.exit(1);
  }
  else {
    DEBUG && console.log('Whitelist conforms to schema');
  }

  // Parse the whitelist with xml2js
  xml2js.parseString(whitelist, function (err, json) {
    callback(json);
  });
}


// Binds soap operations to javascript functions
var service = {
    whitelistService: {
        whitelistPort: {
            getWhitelist : function(args) {
              // Return the full list
              return {
                Tijdstempel: whitelistJSON.Whitelist.Tijdstempel[0],
                Volgnummer: whitelistJSON.Whitelist.Volgnummer[0],
                MedMijnodes: whitelistJSON.Whitelist.MedMijNodes[0].MedMijNode
              };
            },
            isMedMijNode : function(args) {
              // Check for the name passed in the argument
              var found = false;
              // We just walk through the list linearly. If the list becomes longer, 
              // we should sort it first.
              whitelistJSON.Whitelist.MedMijNodes[0].MedMijNode.forEach(function(node) {
                DEBUG && console.log(node);
                if (node.Hostname ==  args) {
                  found = true;
                }
              });
              return {isMedMijNode: found};
            }
        }
    }
};


// Starts up the server
Server.prototype.start = function(callback) {
  var that = this;
  readAndValidateWhitelist(function(json) {
    whitelistJSON = json;
    if (settings.TLS) {
      // Set up HTTPS server
      var options = { 
        key: fs.readFileSync(settings.serverKeyPath), 
        cert: fs.readFileSync(settings.serverCertPath), 
        ca: fs.readFileSync(settings.serverCAPath)
      }; 
      if (settings.twoSided) {
        options.requestCert = true;
        options.rejectUnauthorized = true;
      }
      that.server = https.createServer(options, function (req, res) { 
        console.log(new Date() + ' ' + 
            req.connection.remoteAddress + ' ' + 
            //req.socket.getPeerCertificate().subject.CN + ' ' + 
            req.method + ' ' + req.url);
        res.writeHead(200);
        res.end("404: Not Found: " + req.url); 
      });
    }
    else {
      that.server = http.createServer(function(request, response) {
          response.end("404: Not Found: "+request.url);
      });
    }

    that.server.listen(settings.portNumber, null, null, function() {
      var wsdl = fs.readFileSync(settings.wsdlPath, 'utf8');
      that.soapServer = soap.listen(that.server, '/whitelist', service, wsdl);
      console.log('Listening on port ' + settings.portNumber);
      callback();
    });
  });
};


// Stops the server
Server.prototype.stop = function(callback) {
  var that = this;
  this.server.close(function() {
    delete that.soapServer;
    that.soapServer = null;  
    console.log('Closed server');
    callback();
  });
};


// Constructor
function Server(options) {
  if (options) {
    // Override settings from file
    settings = _.extend(settings, options);
    DEBUG && console.log('Server settings: ' + JSON.stringify(settings, null, 2));
  }
}

module.exports = Server;