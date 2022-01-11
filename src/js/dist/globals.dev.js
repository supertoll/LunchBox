"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _framework = require("framework7");

//const { writer } = require('repl');
//https = require('node:http');
//const fs = require('fs');
//import * as https from 'http';
var id = 0;
var locations;
var theme;
var location;
var offers;
var providers;
var settingsStorage = localStorage;
var global = {
  setId: function setId(i) {
    id = i;
  },
  getId: function getId() {
    return id;
  },
  initLocation: function initLocation() {
    /*
    request.get('http://lunchboxdev.ddns.net/getLocations/index.php').then((res) => {
        locations = JSON.parse(res.data);
    });
    */
    locations = {
      "locations": ["Berlin Springpfuhl", "Neubrandenburg"]
    };
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
  initOffers: function initOffers(d, l) {
    /*
    request.get('http://127.0.0.1/api/getOffer/?date=' + d + '&location=["' + l + '"]').then((res) => {
        offers = JSON.parse(res.data);
    });
    */
    offers = [{
      "id": 696,
      "providerId": 3,
      "name": "Eier",
      "description": "in süß- saurer Soße mit Kartoffeln, dazu Rohkost",
      "price": null,
      "averageRating": null,
      "tags": [],
      "comments": []
    }, {
      "id": 697,
      "providerId": 3,
      "name": "Hähnchenschnitzel",
      "description": "mit Mischgemüse und Kartoffeln",
      "price": null,
      "averageRating": null,
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
  },
  initProviders: function initProviders(l) {
    /*
    request.get('http://127.0.0.1/api/getProvider?location=["' + l + '"]').then((res) => {
        providers = JSON.parse(res.data);
    });
    */
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