//const { writer } = require('repl');
const path = 'src/js/resource.txt';
//https = require('node:http');
//const fs = require('fs');
import { fs } from 'fs';
//import * as https from 'http';
var id = 0;
var locations;
var theme;
var location;
var offers;
var providers;

const global = {
    setId: (i) =>{
        id = i;
    },
    getId: () =>{
        return id;
    },
    initLocation: () =>{
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
    initOffers: (d) =>{
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
        writeFile(path, theme + ';' + location);
        

    },
    importSettings: () => {

        fs.readFile(path, (err, data) => {
            if (err) throw err;
            let l = data.split(';');
            theme = l[0];
            location = l[1];
        });
    },

}
/*
global.initLocation();
global.initOffers();
global.initProviders();
let a = global.organizeOffers(offers, providers);
a.forEach( (aa) => console.log(aa.oo));
*/
export default global;

