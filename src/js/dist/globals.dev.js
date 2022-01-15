"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _framework = _interopRequireWildcard(require("framework7"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//const { writer } = require('repl');
//https = require('node:http');
//const fs = require('fs');
//import * as https from 'http';
var id = 5;
var locations;
var theme;
var location;
var offers;
var providers;
var settingsStorage = localStorage;
var webserver = 'http://lunchboxdev.ddns.net/'; // '/' am Ende ist wichtig!

var global = {
  setId: function setId(i) {
    id = i;
  },
  getId: function getId() {
    return id;
  },
  initLocation: function initLocation() {
    var x;
    return regeneratorRuntime.async(function initLocation$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(_framework.request.get(webserver + 'getLocations/index.php'));

          case 3:
            x = _context.sent;
            locations = JSON.parse(x.data);
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            locations = {
              "locations": ["Berlin Springpfuhl", "Neubrandenburg"]
            };
            console.log(locations);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 7]]);
  },
  getLocations: function getLocations() {
    return locations;
  },
  getTheme: function getTheme() {
    return theme;
  },
  setTheme: function setTheme(t) {
    theme = t;
  },
  getLocation: function getLocation() {
    return location;
  },
  setLocation: function setLocation(l) {
    location = l;
  },
  initOffers: function initOffers(d) {
    var x;
    return regeneratorRuntime.async(function initOffers$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(_framework.request.get(webserver + 'getOffer/?date=' + d + '&location=["' + location + '"]'));

          case 3:
            x = _context2.sent;
            offers = JSON.parse(x.data);
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            offers = [{
              "id": 696,
              "providerId": 3,
              "name": "Eier",
              "description": "in süß- saurer Soße mit Kartoffeln, dazu Rohkost",
              "price": null,
              "averageRating": 5,
              "tags": [],
              "comments": []
            }, {
              "id": 697,
              "providerId": 3,
              "name": "Hähnchenschnitzel",
              "description": "mit Mischgemüse und Kartoffeln",
              "price": null,
              "averageRating": 2,
              "tags": [],
              "comments": []
            }, {
              "id": 698,
              "providerId": 3,
              "name": "gebratenes Zanderfilet",
              "description": "mit Kaisergemüse und Püree",
              "price": null,
              "averageRating": 1.5,
              "tags": [],
              "comments": []
            }, {
              "id": 724,
              "providerId": 10,
              "name": "mit Backpflaumen gefüllter Schweinebraten,",
              "description": "dazu Rotkohl und Knödelscheiben",
              "price": 650,
              "averageRating": 3.5,
              "tags": [],
              "comments": []
            }, {
              "id": 728,
              "providerId": 4,
              "name": "Pasta „Pomodori“",
              "description": "frische Tomaten, Parmesan, Olivenöl, Basilikum, Hühnchenbrust, dazu Nudeln",
              "price": 520,
              "averageRating": null,
              "tags": ["Tagessuppe"],
              "comments": []
            }, {
              "id": 733,
              "providerId": 4,
              "name": "Präsidentensuppe",
              "description": "Rinderhack, Tomaten, Sauerkraut, saure Gurken, Tomatenmark, wahlweise + Schmand",
              "price": 520,
              "averageRating": null,
              "tags": [],
              "comments": []
            }];

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 7]]);
  },
  initProviders: function initProviders() {
    var x;
    return regeneratorRuntime.async(function initProviders$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap(_framework.request.get(webserver + 'getProvider/?location=["' + location + '"]'));

          case 3:
            x = _context3.sent;
            providers = JSON.parse(x.data);
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            providers = [{
              "id": 1,
              "name": "Schweinestall",
              "location": "Neubrandenburg",
              "url": "https://www.schweinestall-nb.de/mittagstisch-2/"
            }, {
              "id": 2,
              "name": "Hotel am Ring",
              "location": "Neubrandenburg",
              "url": "http://www.hotel-am-ring.de/restaurant-rethra.html"
            }, {
              "id": 3,
              "name": "AOK Cafeteria",
              "location": "Neubrandenburg",
              "url": "https://www.tfa-bistro.de"
            }, {
              "id": 4,
              "name": "Suppenkulttour",
              "location": "Neubrandenburg",
              "url": "https://www.suppenkult.com/wochenplan.html"
            }, {
              "id": 8,
              "name": "Das Krauthof",
              "location": "Neubrandenburg",
              "url": "https://www.daskrauthof.de/karte"
            }, {
              "id": 10,
              "name": "Phoenixeum",
              "location": "Neubrandenburg",
              "url": "https://www.suppenkult.com/wochenplan.html"
            }];

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 7]]);
  },
  getOffers: function getOffers() {
    return offers;
  },
  getProviders: function getProviders() {
    return providers;
  },
  organizeOffers: function organizeOffers(o, p) {
    var result = [];
    p.forEach(function (prov) {
      var part = [];
      o.forEach(function (off) {
        if (off.providerId == prov.id) {
          part.push(off);
        }
      });

      if (part.length > 0) {
        result.push({
          pp: prov,
          oo: part
        });
      }
    });
    return result;
  },
  saveSettings: function saveSettings() {
    localStorage.setItem("theme", theme);
    localStorage.setItem("location", location);
  },
  importSettings: function importSettings() {
    theme = localStorage.getItem("theme");
    location = localStorage.getItem("location");
  },
  pushRating: function pushRating(stars, commentText) {}
};
/*
global.initLocation();
global.initOffers();
global.initProviders();
let a = global.organizeOffers(offers, providers);
a.forEach( (aa) => console.log(aa.oo));
*/

var _default = global;
exports["default"] = _default;