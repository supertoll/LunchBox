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
var darkTheme;
var location = "Neubrandenburg";
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
    return date.getFullYear().toString() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + date.getDate().toString().padStart(2, "0");
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
  getDarkTheme: function getDarkTheme() {
    return darkTheme;
  },
  setDarkTheme: function setDarkTheme(t) {
    darkTheme = t;
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
    var temp = API.getOffer(global.getApiDate(), [global.getLocation()], provider); //nur debug

    if (temp == "_" || temp == "[]" || temp.length == 0) {
      temp = [{
        "id": -171,
        "providerId": 10,
        "name": "Senfei",
        "description": "2 Bio-Eier in Senfsoße, dazu Kartoffeln",
        "price": 600,
        "averageRating": 3.0,
        "tags": [],
        "comments": [{
          "comment": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit",
          "rating": 3
        }, {
          "comment": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident",
          "rating": 3
        }]
      }, {
        "id": -697,
        "providerId": 3,
        "name": "Hähnchenschnitzel",
        "description": "mit Mischgemüse und Kartoffeln",
        "price": 300,
        "averageRating": null,
        "tags": [],
        "comments": []
      }, {
        "id": -698,
        "providerId": 3,
        "name": "gebratenes Zanderfilet",
        "description": "mit Kaisergemüse und Püree",
        "price": 200,
        "averageRating": 4,
        "tags": ["vegan", "vegetarisch"],
        "comments": [{
          "comment": "toll",
          "rating": 4
        }]
      }, {
        "id": -724,
        "providerId": 10,
        "name": "mit Backpflaumen gefüllter Schweinebraten,",
        "description": "dazu Rotkohl und Knödelscheiben",
        "price": 650,
        "averageRating": 2.5,
        "tags": [],
        "comments": []
      }, {
        "id": -728,
        "providerId": 4,
        "name": "Pasta „Pomodori“",
        "description": "frische Tomaten, Parmesan, Olivenöl, Basilikum, Hühnchenbrust, dazu Nudeln",
        "price": 520,
        "averageRating": 4,
        "tags": ["Tagessuppe"],
        "comments": []
      }, {
        "id": -733,
        "providerId": 4,
        "name": "Präsidentensuppe",
        "description": "Rinderhack, Tomaten, Sauerkraut, saure Gurken, Tomatenmark, wahlweise + Schmand",
        "price": 520,
        "averageRating": null,
        "tags": ["Testtag"],
        "comments": []
      }];
    }

    offers = temp;
    return temp;
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
    }); //console.log(result);

    return result;
  },
  saveSettings: function saveSettings() {
    console.log("saveing");
    localStorage.setItem("darkTheme", darkTheme);
    localStorage.setItem("location", location);
  },
  importSettings: function importSettings() {
    darkTheme = localStorage.getItem("darkTheme") == "true";
    location = localStorage.getItem("location");
  },
  getUserId: function getUserId() {
    if (userId == -1) {
      userId = API.getUserId().id;
    } //console.log(userId);


    return userId;
  },
  pushRating: function pushRating(stars, commentText) {
    //setRating(offerId,userId,rating,comment=null)
    //console.log(commentText);
    API.setRating(id, global.getUserId(), stars, commentText);
  },
  ratingToStars: function ratingToStars(rating) {
    var htmlString = '';

    if (rating == null) {} else {
      rating = Math.round(2 * rating) / 2; //console.log(rating);

      var filledStars = parseInt(rating); //console.log(filledStars);

      var halfStar = 0;
      htmlString += '<i class="f7-icons" style="font-size: 18px; color: #007755;">star_fill</i>'.repeat(filledStars);

      if (rating - filledStars == 0.5) {
        htmlString += '<i class="f7-icons" style="font-size: 18px; color: #007755;">star_lefthalf_fill</i>';
        halfStar = 1;
      }

      htmlString += '<i class="f7-icons" style="font-size: 18px; color: #007755;">star</i>'.repeat(5 - filledStars - halfStar);
    }

    return htmlString;
  },
  createTag: function createTag(tag) {
    var tagToColor = function tagToColor(tag) {
      var color = {
        "Tagessuppe": "#ff3814",
        "vegetarisch": "#167716",
        "vegan": "#19e519"
      };

      if (Object.keys(color).includes(tag)) {
        return color[tag];
      } else {
        return "#8e8e93"; //uses default
      }
    }; //console.log('<span style=\"--f7-badge-bg-color: '+tagToColor(tag)+';\" class=\"badge\">'+tag+'</span>');


    return '<span ' + 'style=\"--f7-badge-bg-color: ' + tagToColor(tag) + '; margin-right: 4px;\" class=\"badge\">' + tag + '</span>';
  },
  getMeal: function getMeal(i) {
    return offers.filter(function (m) {
      return m.id == i;
    })[0];
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