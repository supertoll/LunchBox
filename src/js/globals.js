//const { writer } = require('repl');
//https = require('node:http');
//const fs = require('fs');
//import * as https from 'http';
import Framework7, { request } from 'framework7';
import "./API";
import FoodApi from './API';
var id = 5;
var locations;
var darkTheme;
var location = "Neubrandenburg";
var userId = -1; //not initialized
var offers;
var providers;
var providerCustomOrder = [];
var providerCollapsed = [];
var settingsStorage = localStorage;
const webserver = "http://lunchboxdev.ddns.net/";//'http://lunchboxdev.ddns.net/'; // '/' am Ende ist wichtig!
const API  = new FoodApi(webserver);
var date = new Date();

//all 3 initFunctions should be able to be deleted
const global = {
  addProviderCollapsed:(id)=>{
    if(providerCollapsed.indexOf(id) == -1){
      providerCollapsed.push(id);
    }
    global.saveSettings();
    console.log(global.getProviderCollapsed());

  },removeProviderCollapsed:(id)=>{
    let a = providerCollapsed.splice(0,providerCollapsed.indexOf(id)+1);
    a.pop();
    providerCollapsed = a.concat(providerCollapsed);
    global.saveSettings();
    console.log(global.getProviderCollapsed());

  },getProviderCollapsed:()=>{
    return providerCollapsed;
  },setProviderCollapsed:(p)=>{
    providerCollapsed = p;
  } ,
  getDate:()=>{
  
    return date.getDate().toString() + "." + (date.getMonth() + 1).toString() + "." + date.getFullYear().toString();
  },

  increaseDate:()=>{
    var freitag = 5;
    if (date.getDay() == freitag) {
      date.setDate(date.getDate() + 3);
    } else {
      date.setDate(date.getDate() + 1);
    }
  },

  decreaseDate:()=>{
    var montag = 1;
    if (date.getDay() == montag) {
      date.setDate(date.getDate() - 3);
    } else {
      date.setDate(date.getDate() - 1);
    }
  },
	
  getApiDate:()=>{
    return date.getFullYear().toString() + "-" + String(date.getMonth() + 1).padStart(2,"0") + "-" + date.getDate().toString().padStart(2,"0");
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
  getDarkTheme: () => {
    return darkTheme;
  },
  setDarkTheme: (t) => {
    darkTheme = t;
  },
  getLocation: () =>{
    return location;
  },
  setLocation: (l) => {
    location = l;
  },
  getOffers: (location=null,provider=null) => {
        let temp = API.getOffer(global.getApiDate(),[global.getLocation()],provider);
				//nur debug
        if(temp == "_" || temp == "[]" || temp.length == 0){
            temp = [
							{
								"id": -171,
								"providerId": 10,
								"name": "Senfei",
								"description": "2 Bio-Eier in Senfsoße, dazu Kartoffeln",
								"price": 600,
								"averageRating": 3.0,
								"tags": [],
								"comments": [
									{
										"comment": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit",
										"rating": 3
									},
									{
										"comment": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident",
										"rating": 3
									}
								]
							},
							{
								"id": -697,
								"providerId": 3,
								"name": "Hähnchenschnitzel",
								"description": "mit Mischgemüse und Kartoffeln",
								"price": 300,
								"averageRating": null,
								"tags": [],
								"comments": []
							},
							{
								"id": -698,
								"providerId": 3,
								"name": "gebratenes Zanderfilet",
								"description": "mit Kaisergemüse und Püree",
								"price": 200,
								"averageRating": 4,
								"tags": [
                  "vegan",
                  "vegetarisch"
                ],
								"comments": [
                  {
                    "comment":"toll",
                    "rating":4
                  }
                ]
							},
							{
									"id": -724,
									"providerId": 10,
									"name": "mit Backpflaumen gefüllter Schweinebraten,",
									"description": "dazu Rotkohl und Knödelscheiben",
									"price": 650,
									"averageRating": 2.5,
									"tags": [],
									"comments": []
							},
							{
									"id": -728,
									"providerId": 4,
									"name": "Pasta „Pomodori“",
									"description": "frische Tomaten, Parmesan, Olivenöl, Basilikum, Hühnchenbrust, dazu Nudeln",
									"price": 520,
									"averageRating": 4,
									"tags": [
											"Tagessuppe"
									],
									"comments": []
							},
							{
								"id": -733,
								"providerId": 4,
								"name": "Präsidentensuppe",
								"description": "Rinderhack, Tomaten, Sauerkraut, saure Gurken, Tomatenmark, wahlweise + Schmand",
								"price": 520,
								"averageRating": null,
								"tags": [
                  "Testtag"
                ],
								"comments": []
							}
					];
        }
        
        offers = temp;
        return temp;
        
  },getOfferById:(id)=>{
    var temp = API.getOfferById(id).offer;
    if(temp == "_"){
      return getMeal(id);
    }else{
      return temp;
    }
  },
  getProviders: (loc = [global.getLocation()] ) => {
    let temp =  API.getProvider(loc);
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
        return temp;
    }
  },
  organizeOffers: (offers,providers) =>{
    let temp = [];
    providers.forEach(provider => {
      let part = [];
      offers.forEach(offer => {
        if (offer.providerId == provider.id){
          part.push(offer);
        }
      });
      if (part.length > 0 ){
        //temp[providerCustomOrder.indexOf(provider.id)] = {pp: provider, oo : part}
        temp.push({pp: provider, oo : part})
      }
        
    });
    //console.log(temp);

    //sorting
    let result = [];
    providerCustomOrder.forEach(id=>{
      let r = temp.filter(o => o.pp.id == id)[0];
      if(! (typeof r === 'undefined')){
        result.push(r)
      }
    })

    //console.log(result);
    return result;
  },
  saveSettings: () => {
    console.log("saveing")
    localStorage.setItem("darkTheme", darkTheme);
    localStorage.setItem("location", location);
    localStorage.setItem("providerCollapsed",JSON.stringify(providerCollapsed));
  },
  importSettings: () => {
    darkTheme = localStorage.getItem("darkTheme") == "true";
    location = localStorage.getItem("location");
    providerCollapsed = JSON.parse(localStorage.getItem("providerCollapsed"));
  },
  getUserId: () => {
    if(userId == -1){
      userId = API.getUserId().id;
    }
    //console.log(userId);
    return userId;
  },
  pushRating: (stars, commentText) => {
    //setRating(offerId,userId,rating,comment=null)
    //console.log(commentText);
    API.setRating(id,global.getUserId(),stars,commentText);
  },
  ratingToStars: (rating) =>{
    let htmlString = '';

    if (rating == null){

    }
		else{

			rating = Math.round(2*rating)/2;
      //console.log(rating);
			let filledStars = parseInt(rating);
      //console.log(filledStars);
      let halfStar = 0;

			htmlString += '<i class="f7-icons" style="font-size: 18px; color: #007755;">star_fill</i>'.repeat(filledStars);
			if(rating-filledStars == 0.5){
				htmlString += '<i class="f7-icons" style="font-size: 18px; color: #007755;">star_lefthalf_fill</i>';
				halfStar = 1;
      }
			htmlString += '<i class="f7-icons" style="font-size: 18px; color: #007755;">star</i>'.repeat(5 - filledStars - halfStar);
    }
		return htmlString;
  },createTag:(tag)=>{
    const tagToColor = (tag) =>{
      let color = {"Tagessuppe":"#ff3814","vegetarisch":"#167716","vegan":"#19e519"};
      if (Object.keys(color).includes(tag)){
        return color[tag];
      }else{
        return "#8e8e93";//uses default
      }
    }
    //console.log('<span style=\"--f7-badge-bg-color: '+tagToColor(tag)+';\" class=\"badge\">'+tag+'</span>');
    return '<span style=\"--f7-badge-bg-color: '+tagToColor(tag)+'; margin-right: 4px;\" class=\"badge\">'+tag+'</span>';
  },
  getMeal: (i) => {
    return offers.filter(m => m.id == i)[0];
  },
  getFancyDate: () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('de-DE', options).replace(', ', '</br>');
  },getProviderCustomOrder: ()=>{
    return providerCustomOrder;
  },setProviderCustomOrder:(order)=>{
    providerCustomOrder = order;
  },
  changeCustomOrder:(idFrom,idTo)=>{
    let from = providerCustomOrder.indexOf(idFrom);
    let to = providerCustomOrder.indexOf(idTo);
    //console.log(from,to);

    //'REMOVE'
    let a = providerCustomOrder.splice(0,from+1);
    a.pop();
    providerCustomOrder = a.concat(providerCustomOrder);
    //console.log("removed",providerCustomOrder);

    //place id
    a = providerCustomOrder.splice(0,to);
    a.push(idFrom);
    let b = providerCustomOrder;
    //onsole.log("added",providerCustomOrder);

    providerCustomOrder = a.concat(b);    
    global.setCustomOrderS(providerCustomOrder);
  },
  setCustomOrderS:(order)=>{
    providerCustomOrder = order;
    //console.log(providerCustomOrder);
    localStorage.setItem("customOrder", JSON.stringify(order));
  },importCustomOrderS:()=>{
    providerCustomOrder = JSON.parse(localStorage.getItem("customOrder"));
    console.log(providerCustomOrder);
  },getCustomOrder:()=>{
    return providerCustomOrder;
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

