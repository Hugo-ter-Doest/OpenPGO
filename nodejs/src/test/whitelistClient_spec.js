/*
Jasmine tests for SOAP/XML client for MedMij whitelist parsing
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

var Server = require('../server/WhitelistServer');
var Client = require('../client/WhitelistClient');


var scenarios = [{TLS: false, twoSided: false}, 
                 {TLS: true, twoSided: false}/*,
                 {TLS: true, twoSided: true}*/];
scenarios.forEach(function(options) {
  console.log(options);

  describe('Whitelist client', function() {

    var portNumber = 8000;
    var server = null;
    var TLS = false;
    var twoSided = false;
    //var secOptions = {};


    beforeEach(function(done) {
      console.log(options);
      server = new Server(options);
      server.start(function() {
        setTimeout(
        done, 100);
      });
    });


    afterEach(function(done) {
      server.stop(function() {
        done();
      });
    });
  
  
    it('should create a whitelist client correctly', function(done) {
      // Create a client and check if the operations exist
      new Client(options, function(client) {
        expect(client.getWhitelist).toBeDefined();
        expect(client.isMedMijNode).toBeDefined();
        done();
      });
    });
    

    it('should retrieve the whitelist', function(done)  {
      // Create a client and retrieve whitelist
      new Client(options, function(client) {
        client.getWhitelist({}, function(err, result) {
          //console.log(result);
          expect(result.MedMijnodes.length).toBeGreaterThan(0);
          done();
        });      
      });
    });


    it('should check if a node is on the whitelist', function(done)  {
      // Create a client and validate a node name
      new Client(options, function(client) {
        client.isMedMijNode('medmij.deenigeechtepgo.nl', function(err, result) {
          expect(result.isMedMijNode).toBe('true');
          done();
        });
      });
    });
  });
});