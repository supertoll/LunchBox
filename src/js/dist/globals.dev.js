"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _framework = _interopRequireWildcard(require("framework7"));

var _API = _interopRequireDefault(require("./API"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
var userId = -1; //not initialized

var offers;
var providers;
var settingsStorage = localStorage;
var webserver = 'http://lunchboxdev.ddns.net/'; // '/' am Ende ist wichtig!

var API = new _API["default"](webserver);
var date = new Date(); //all 3 initFunctions should be able to be deleted

var global = {
  getDate: function getDate() {
    return date.getDate().toString() + "." + (date.getMonth() + 1).toString() + "." + date.getFullYear().toString();
  },
  increaseDate: function increaseDate() {
    date.setDate(date.getDate() + 1);
  },
  decreaseDate: function decreaseDate() {
    date.setDate(date.getDate() - 1);
  },
  getApiDate: function getApiDate() {
    return date.getFullYear().toString() + "-" + (date.getMonth() + 1).toString() + "-" + date.getDate().toString();
  },
  setId: function setId(i) {
    id = i;
  },
  getId: function getId() {
    return id;
  },
  getLocations: function getLocations() {
    var temp = API.getLocations();

    if (temp == "_") {
      return {
        "locations": ["Berlin Springpfuhl", "Neubrandenburg"]
      };
    } else {
      return temp;
    }
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
  getOffers: function getOffers() {
    var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var provider = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var temp = API.getOffer(global.getApiDate(), location, provider); //nur debug

    if (temp == "_" || temp == "[]" || temp.length == 0) {
      return [{
        "id": 171,
        "providerId": 10,
        "name": "Senfei",
        "description": "2 Bio-Eier in Senfsoße, dazu Kartoffeln",
        "price": 600,
        "averageRating": "3.0",
        "tags": [],
        "comments": [{
          "comment": "test2",
          "rating": 3
        }, {
          "comment": "test",
          "rating": 3
        }]
      }, {
        "id": 697,
        "providerId": 3,
        "name": "Hähnchenschnitzel",
        "description": "mit Mischgemüse und Kartoffeln",
        "price": null,
        "averageRating": "2.5",
        "tags": [],
        "comments": []
      }, {
        "id": 698,
        "providerId": 3,
        "name": "gebratenes Zanderfilet",
        "description": "mit Kaisergemüse und Püree",
        "price": null,
        "averageRating": null,
        "tags": [],
        "comments": []
      }, {
        "id": 724,
        "providerId": 10,
        "name": "mit Backpflaumen gefüllter Schweinebraten,",
        "description": "dazu Rotkohl und Knödelscheiben",
        "price": 650,
        "averageRating": null,
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
    } else {
      offers = temp;
      return temp;
    }
  },
  getProviders: function getProviders() {
    var temp = API.getProvider(location);

    if (temp == "_") {
      return [{
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
    } else {
      return temp;
    }
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
    console.log(result);
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
  getUserId: function getUserId() {
    if (userId == -1) {
      userId = API.getUserId();
    }

    return userId;
  },
  pushRating: function pushRating(stars, commentText) {
    //setRating(offerId,userId,rating,comment=null)
    API.setRating(id, getUserId, stars, commentText);
  },
  ratingToStars: function ratingToStars(rating) {
    var htmlString = '';

    if (rating == null) {
      htmlString += '<i class="f7-icons" style="font-size: 18px; color: #FFE900;">star</i>'.repeat(5);
    } else {
      rating = Number(rating);
      var half_star = 0;
      htmlString += '<i class="f7-icons" style="font-size: 18px; color: #FFE900;">star_fill</i>'.repeat(parseInt(rating.toFixed(0)));
      var delta = rating - parseInt(rating.toFixed(1)); //<=0.25 ~ kein stern <=0.75 ~ halber stern >0.75 ~stern

      if (delta > 0.75) {
        htmlString += '<i class="f7-icons" style="font-size: 18px; color: #FFE900;">star_fill</i>';
      } else if (delta > 0.25) {
        htmlString += '<i class="f7-icons" style="font-size: 18px; color: #FFE900;">star_lefthalf_fill</i>';
        half_star = 1;
      }

      htmlString += '<i class="f7-icons" style="font-size: 18px; color: #FFE900;">star</i>'.repeat(5 - parseInt(rating.toFixed(0)) - half_star);
    }

    return htmlString;
  }
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