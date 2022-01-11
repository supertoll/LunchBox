//const { writer } = require('repl');
//https = require('node:http');
//const fs = require('fs');
//import * as https from 'http';
import { request } from 'framework7';
var id = 0;
var locations;
var theme;
var location;
var offers;
var providers;
var settingsStorage = localStorage;

const global = {
    setId: (i) =>{
        id = i;
    },
    getId: () =>{
        return id;
    },
    initLocation: () =>{
        /*
        request.get('http://lunchboxdev.ddns.net/getLocations/index.php').then((res) => {
            locations = JSON.parse(res.data);
        });
        */
       locations = {
        "locations": [
            "Berlin Springpfuhl",
            "Neubrandenburg"
            ]
        }
    },
    getLocations: () =>{
        return locations;
    },
    getTheme: () => {
        return theme;
    },
    setTheme: (t) => {
        theme = t;
    },
    getLocation: () =>{
        return location;
    },
    setLocation: (l) => {
        location = l;
    },
    initOffers: (d,l) =>{
        /*
        request.get('http://127.0.0.1/api/getOffer/?date=' + d + '&location=["' + l + '"]').then((res) => {
            offers = JSON.parse(res.data);
        });
        */

        offers = [
            {
                "id": 696,
                "providerId": 3,
                "name": "Eier",
                "description": "in süß- saurer Soße mit Kartoffeln, dazu Rohkost",
                "price": null,
                "averageRating": null,
                "tags": [],
                "comments": []
            },
            {
                "id": 697,
                "providerId": 3,
                "name": "Hähnchenschnitzel",
                "description": "mit Mischgemüse und Kartoffeln",
                "price": null,
                "averageRating": null,
                "tags": [],
                "comments": []
            },
            {
                "id": 698,
                "providerId": 3,
                "name": "gebratenes Zanderfilet",
                "description": "mit Kaisergemüse und Püree",
                "price": null,
                "averageRating": null,
                "tags": [],
                "comments": []
            },
            {
                "id": 724,
                "providerId": 10,
                "name": "mit Backpflaumen gefüllter Schweinebraten,",
                "description": "dazu Rotkohl und Knödelscheiben",
                "price": 650,
                "averageRating": null,
                "tags": [],
                "comments": []
            },
            {
                "id": 728,
                "providerId": 4,
                "name": "Pasta „Pomodori“",
                "description": "frische Tomaten, Parmesan, Olivenöl, Basilikum, Hühnchenbrust, dazu Nudeln",
                "price": 520,
                "averageRating": null,
                "tags": [
                    "Tagessuppe"
                ],
                "comments": []
            },
            {
                "id": 733,
                "providerId": 4,
                "name": "Präsidentensuppe",
                "description": "Rinderhack, Tomaten, Sauerkraut, saure Gurken, Tomatenmark, wahlweise + Schmand",
                "price": 520,
                "averageRating": null,
                "tags": [],
                "comments": []
            }
        ]
    },
    initProviders: (l) => {
        /*
        request.get('http://127.0.0.1/api/getProvider?location=["' + l + '"]').then((res) => {
            providers = JSON.parse(res.data);
        });
        */
        providers = [
            {
                "id": 1,
                "name": "Schweinestall",
                "location": "Neubrandenburg",
                "url": "https://www.schweinestall-nb.de/mittagstisch-2/"
            },
            {
                "id": 2,
                "name": "Hotel am Ring",
                "location": "Neubrandenburg",
                "url": "http://www.hotel-am-ring.de/restaurant-rethra.html"
            },
            {
                "id": 3,
                "name": "AOK Cafeteria",
                "location": "Neubrandenburg",
                "url": "https://www.tfa-bistro.de"
            },
            {
                "id": 4,
                "name": "Suppenkulttour",
                "location": "Neubrandenburg",
                "url": "https://www.suppenkult.com/wochenplan.html"
            },
            {
                "id": 8,
                "name": "Das Krauthof",
                "location": "Neubrandenburg",
                "url": "https://www.daskrauthof.de/karte"
            },
            {
                "id": 10,
                "name": "Phoenixeum",
                "location": "Neubrandenburg",
                "url": "https://www.suppenkult.com/wochenplan.html"
            }
        ]
    },
    getOffers: () => {
        return offers;
    },
    getProviders: () => {
        return providers;
    },
    organizeOffers: (o,p) =>{
        let result = [];
        p.forEach(prov => {
            let part = [];
            o.forEach(off => {
                if (off.providerId == prov.id){
                    part.push(off);
                }
            });
            if (part.length > 0 ){
                result.push({pp: prov, oo : part})
            }
            
        });
        return result;
    },
    saveSettings: () => {
        localStorage.setItem("theme", theme);
        localStorage.setItem("location", location);
    },
    importSettings: () => {
        theme = localStorage.getItem("theme");
        location = localStorage.getItem("location");
    },
    pushRating: (stars, commentText) => {
        
    }

}
/*
global.initLocation();
global.initOffers();
global.initProviders();
let a = global.organizeOffers(offers, providers);
a.forEach( (aa) => console.log(aa.oo));
*/
export default global;

