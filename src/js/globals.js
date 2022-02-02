//const { writer } = require('repl');
//https = require('node:http');
//const fs = require('fs');
//import * as https from 'http';
import Framework7, { request } from 'framework7';
import "./API";
import FoodApi from './API';
var id = 5;
var locations;
var theme;
var location;
var offers;
var providers;
var settingsStorage = localStorage;
const webserver = 'http://lunchboxdev.ddns.net/'; // '/' am Ende ist wichtig!
const API  = new FoodApi(webserver);
var date = new Date();

const global = {
    getDate:()=>{
        return date.getDate().toString() + "." + (date.getMonth() + 1).toString() + "." + date.getFullYear().toString();
    },increaseDate:()=>{
        date.setDate(date.getDate() + 1);
    },decreaseDate:()=>{
        date.setDate(date.getDate() - 1);
    },getApiDate:()=>{
        return  date.getFullYear().toString() + "-" + (date.getMonth() + 1).toString() + "-" + date.getDate().toString();
    },
    setId: (i) =>{
        id = i;
    },
    getId: () =>{
        return id;
    },
    initLocation: async () =>{
        try{
            var x = await request.get(webserver + 'getLocations/index.php')
            locations = JSON.parse(x.data)
        }
        catch{
            locations = {
                "locations":[
                    "Berlin Springpfuhl",
                    "Neubrandenburg"
                ]
            }
            console.log(locations)
        }
    },
    getLocations: () =>{
        let temp = API.getLocations();
        if(temp == "_"){
            return {
                "locations":[
                    "Berlin Springpfuhl",
                    "Neubrandenburg"
                ]
            };
        }
        else{
            return temp
        }
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
    initOffers: async (d) =>{
        try{
            var x = await request.get(webserver + 'getOffer/?date=' + d + '&location=["' + location + '"]');
            offers = JSON.parse(x.data);
        }
        catch{
            offers = [
                {
                    "id": 696,
                    "providerId": 3,
                    "name": "Eier",
                    "description": "in süß- saurer Soße mit Kartoffeln, dazu Rohkost",
                    "price": null,
                    "averageRating": 5,
                    "tags": [],
                    "comments": []
                },
                {
                    "id": 697,
                    "providerId": 3,
                    "name": "Hähnchenschnitzel",
                    "description": "mit Mischgemüse und Kartoffeln",
                    "price": null,
                    "averageRating": 2,
                    "tags": [],
                    "comments": []
                },
                {
                    "id": 698,
                    "providerId": 3,
                    "name": "gebratenes Zanderfilet",
                    "description": "mit Kaisergemüse und Püree",
                    "price": null,
                    "averageRating": 1.5,
                    "tags": [],
                    "comments": []
                },
                {
                    "id": 724,
                    "providerId": 10,
                    "name": "mit Backpflaumen gefüllter Schweinebraten,",
                    "description": "dazu Rotkohl und Knödelscheiben",
                    "price": 650,
                    "averageRating": 3.5,
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
        }
    },
    initProviders: async () => {
        try{
            var x = await request.get(webserver + 'getProvider/?location=["' + location + '"]');
            providers = JSON.parse(x.data);
        }
        catch{
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
        }
    },
    getOffers: (location=null,provider=null) => {
        let temp = API.getOffer(global.getApiDate(),location,provider);
        if(temp == "_"){
            return [
                {
                    "id": 696,
                    "providerId": 3,
                    "name": "Eier",
                    "description": "in süß- saurer Soße mit Kartoffeln, dazu Rohkost",
                    "price": null,
                    "averageRating": 5,
                    "tags": [],
                    "comments": []
                },
                {
                    "id": 697,
                    "providerId": 3,
                    "name": "Hähnchenschnitzel",
                    "description": "mit Mischgemüse und Kartoffeln",
                    "price": null,
                    "averageRating": 2,
                    "tags": [],
                    "comments": []
                },
                {
                    "id": 698,
                    "providerId": 3,
                    "name": "gebratenes Zanderfilet",
                    "description": "mit Kaisergemüse und Püree",
                    "price": null,
                    "averageRating": 1.5,
                    "tags": [],
                    "comments": []
                },
                {
                    "id": 724,
                    "providerId": 10,
                    "name": "mit Backpflaumen gefüllter Schweinebraten,",
                    "description": "dazu Rotkohl und Knödelscheiben",
                    "price": 650,
                    "averageRating": 3.5,
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
            ];
        }
        else{
            return temp;
        }
    },
    getProviders: () => {
        let temp =  API.getProvider(location);
        if(temp == "_"){
            return [
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
        }
        else{
            return temp
        }
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
        console.log(result);
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

