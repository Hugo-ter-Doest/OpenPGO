# Inleiding

Deze respository/map bevat drie API's met bijbehorende referentie-implementatie van client en server in nodejs.

1. Opvragen Zorgaanbieder Lijst
2. Opvragen whitelist
3. Opvragen OAuth Client lijst

De API's zijn SOAP/XML en gespecificeerd in de vorm van een WSDL. De client en server zijn als aparte nodejs modules beschikbaar, er er is een functionele unit test waarin clients en servers worden gecreeerd benodigd voor de tests. 

Ieder onderdeel omvat:
* Ontwerpdocumentatie
* WSDL
* Implementatie van een client
* Implementatie van een server
* Unit test

De modules maken gebruik van de volgende nodejs modules van NPM:
* [soap](https://www.npmjs.com/package/soap), framework voor SOAP clients en servers
* [node-xmllint](https://www.npmjs.com/package/node-xmllint), voor het valideren van XML tegen het betreffende schema
* [xml2js](https://www.npmjs.com/package/xml2js) voor het converteren van XML naar JSON.
* [jasmine-node](https://www.npmjs.com/package/jasmine-node) voor unit testen


# Opvragen Whitelist

## Instellingen voor de server

## Instellingen voor de client


# Opvragen Zorgaanbieder lijst


# Opvragen OAuth Client lijst


# Bronnen


# Licentie van de software/broncode

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


# Licentie van de content

Content zoals deze README en ook voorbeeld XML-bestanden vallen over [Creative Commons Attribution Sharealike 4.0
International](https://creativecommons.org/licenses/by-sa/4.0/).
