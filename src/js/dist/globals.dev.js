"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
//const { writer } = require('repl');
var path = 'src/js/resource.txt'; //https = require('node:http');
//const fs = require('fs');
//import * as https from 'http';

var id = 0;
var locations;
var theme = "";
var location = "Neubrandenburg";
var offers;
var providers;
var global = {
  setId: function setId(i) {
    id = i;
  },
  getId: function getId() {
    return id;
  },
  initLocation: function initLocation() {
    /*
    https.get('http://lunchboxdev.ddns.net/getLocations/index.php', res => {
        let data = [];
          res.on('data', chunk => {
        data.push(chunk);
        });
          res.on('end', () => {
            locations = JSON.parse(Buffer.concat(data).toString());
        });
    })
    .on('error', err => {
        console.log('Error: ', err.message);
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
  initOffers: function initOffers(d) {
    /*
    https.get('http://127.0.0.1/api/getOffer/?date=' + d + '&location=["' + location + '"]', res => {
        let data = [];
          res.on('data', chunk => {
        data.push(chunk);
        });
          res.on('end', () => {
            offers = JSON.parse(Buffer.concat(data).toString());
        });
    })
    .on('error', err => {
        console.log('Error: ', err.message);
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
    /*https.get('http://127.0.0.1/api/getProvider?location=["' + l + '"]', res => {
        let data = [];
          res.on('data', chunk => {
        data.push(chunk);
        });
          res.on('end', () => {
            providers = JSON.parse(Buffer.concat(data).toString());
        });
    })
    .on('error', err => {
        console.log('Error: ', err.message);
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
  saveSettings: function saveSettings() {},
  importSettings: function importSettings() {}
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