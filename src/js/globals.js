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
var userId = -1; //not initialized
var offers;
var providers;
var settingsStorage = localStorage;
const webserver = 'http://lunchboxdev.ddns.net/'; // '/' am Ende ist wichtig!
const API  = new FoodApi(webserver);
var date = new Date();

//all 3 initFunctions should be able to be deleted
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
  getOffers: (location=null,provider=null) => {
        let temp = API.getOffer(global.getApiDate(),location,provider);
				//nur debug
        if(temp == "_" || temp == "[]" || temp.length == 0){
            return [
							{
									"id": 171,
									"providerId": 10,
									"name": "Senfei",
									"description": "2 Bio-Eier in Senfsoße, dazu Kartoffeln",
									"price": 600,
									"averageRating": "3.0",
									"tags": [],
									"comments": [
											{
													"comment": "test2",
													"rating": 3
											},
											{
													"comment": "test",
													"rating": 3
											}
									]
							},
							{
									"id": 697,
									"providerId": 3,
									"name": "Hähnchenschnitzel",
									"description": "mit Mischgemüse und Kartoffeln",
									"price": null,
									"averageRating": "2.5",
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
					];
        }
        else{
          offers = temp;
          return temp;
        }
  },
  getOfferById: (id) =>{
    let temp = API.getOfferById(id);
    if(temp == "__"){
      //ToDO: filter offers
    }
    return temp;
    
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
  getUserId: () => {
        if(userId == -1){
            userId = API.getUserId();
        }
        return userId;
  },
  pushRating: (stars, commentText) => {
    //setRating(offerId,userId,rating,comment=null)
    API.setRating(id,getUserId,stars,commentText);
  },
  ratingToStars: (rating) =>{
    let htmlString = '';

    if (rating == null){
      htmlString += '<i class="f7-icons" style="font-size: 18px; color: #FFE900;">star</i>'.repeat(5);
    }
		else{
			rating = Number(rating);
			let half_star = 0
			htmlString += '<i class="f7-icons" style="font-size: 18px; color: #FFE900;">star_fill</i>'.repeat(parseInt(rating.toFixed(0)));
      let delta = (rating - parseInt(rating.toFixed(1)));
      //<=0.25 ~ kein stern <=0.75 ~ halber stern >0.75 ~stern
      if (delta > (0.75)) {
				htmlString += '<i class="f7-icons" style="font-size: 18px; color: #FFE900;">star_fill</i>';
      }
			else if(delta > (0.25)){
				htmlString += '<i class="f7-icons" style="font-size: 18px; color: #FFE900;">star_lefthalf_fill</i>';
				half_star = 1;
      }
			
			htmlString += '<i class="f7-icons" style="font-size: 18px; color: #FFE900;">star</i>'.repeat(5 - parseInt(rating.toFixed(0)) - half_star);
    }
		return htmlString;
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

