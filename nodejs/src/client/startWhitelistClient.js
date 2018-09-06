/*
Script for starting up the client and execute some calls
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

var Client = require('./WhitelistClient.js');

var client = new Client({TLS: true, twoSided: false}, function(client) {
  client.isMedMijNode('78834.umcharderwijk.nl', function(err, result) {
    console.log(result);
  });
  client.getWhitelist({}, function(err, result) {
    console.log(result);
  });
});
