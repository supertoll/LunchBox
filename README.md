<<<<<<< HEAD
# Schnittstellenberschreibung
____
## Beschreibung:
>Diese API basiert auf Daten der [rori-api](https://lunchbox.rori.info/about). Sie liefert die Essensangebote von Partnern. Die API fügt der rori-api noch weitere Funktionen hinzu. So gibt es zusätzlich die Möglichkeit der Bewertung und Kommentierung. Außerdem ist es möglich, einzelne Essensangebote für bestimmte Orte, Tage, Essensanbieter zu bekommen.
>
## Funktionen:
### getUserId:
___
#### Beschreibung:
>"getUserId" gibt eine ID zurück und ist eine GET Methode. Die ID wird zur Identifizierung des Nutzers genutzt. Die ID wird zum Kommentieren benötigt. Die Funktion benötigt keine weiteren Parameter.
>
```
http://127.0.0.1/api/getUserId
```
output:
```
{
    "id": 3
}
```
### getLocations:
---
#### Beschreibung:
>Gibt die Orte, für die es Essensanbieter gibt, in einem array zurück.
>
```
http://127.0.0.1/api/getLocations
```
output:
```JSON
{
    "locations": [
        "Berlin Springpfuhl",
        "Neubrandenburg"
        ]
}
```
### getProvider:
___
#### Beschreibung:
>Gibt die Essensanbieter und ihre Daten zurück.
>
#### Args:
##### locations:
>"locations" ist ein optionales Argument. Es ist ein array im JSON Format. Durch die Angabe eines Ortes werden nur für den Ort spezifische Essensanbieter zurückgegeben. 
>
```
http://127.0.0.1/api/getProvider?location=[{locations}]
```
```
http://127.0.0.1/api/getProvider?location=["Neubrandenburg"]
```
output:
```JSON
[
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
```

### getOffer
___
#### Beschreibung:
>Die "getOffer" Methode ist eine GET Methode. Sie gibt im Allgemeinen Essensangebote für ein bestimmtes Datum wieder. Jedoch können auch nur Essensangebote für bestimmte Essensanbieter und/oder bestimmte Orte geliefert werden.
>
#### Args:
##### date:
>"date" ist ein nötiges Argument, das in jedem Fall übergeben werden muss. Das Format entspricht **{jjjj}-{mm}-{dd}**. Durch "date" werden nur Essensangebote für das entsprechende Datum zurückgegeben.
>
```
http://127.0.0.1/api/getOffer/?date={jjjj}-{mm}-{dd}
```
```
http://127.0.0.1/api/getOffer/?date=2021-12-7
```
output:
```Json
[
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
```
##### location:
>"location" ist ein optionales Argument. Durch "location" werden nur nach der entsprechenden "location" gefilterte Essensangebote zurückgegeben.
>
```
http://127.0.0.1/api/getOffer/?date=2021-12-7&location=[{location}]
```
```
http://127.0.0.1/api/getOffer/?date=2021-12-6&location=["Berlin Springpfuhl"]
```
output:
```JSON
[
{
"id": 683,
"providerId": 7,
"name": "Nudeln Bolognese",
"description": "",
"price": 500,
"averageRating": null,
"tags": [],
"comments": []
},
{
"id": 684,
"providerId": 7,
"name": "Wirsingkohleintopf",
"description": "mit Brot",
"price": 350,
"averageRating": null,
"tags": [],
"comments": []
}
]
```
##### provider:

>"provider" ist ein optionales Argument. Es erhält ein array mit Essensanbieter ID's im JSON Format **[n\*{0-9}]**. Mit "provider" werden nur Essensangebote von den entsprechenden Essensanbietern angezeigt.
>
```
http://127.0.0.1/api/getOffer/?date=2021-12-7&provider=[{id}]
```
```
http://127.0.0.1/api/getOffer/?date=2021-12-7&provider=[1,2,3]
```
output:
```JSON
[
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
    "id": 773,
    "providerId": 1,
    "name": "Kasselersteak",
    "description": "mit Sauerkraut und Kartoffelpüree",
    "price": 590,
    "averageRating": null,
    "tags": [],
    "comments": []
}
]
```

### setRating:
___
#### Beschreibung:
>Fügt einem Gericht eine Bewertung **(1-5)** hinzu. Außerdem ist es möglich, ein Kommentar zu hinterlegen:
>
#### Args:
##### offerId:
>"offerId" ist ein benötigtes Argument. Es dient der Zuordnung zu einem Gericht.
>
```
http://127.0.0.1/api/setRating?offerId={id}
```
```
http://127.0.0.1/api/setRating?offerId=3
```
##### userId:
>"offerId" ist ein benötigtes Argument. Es dient der Identifikation eines Nutzers.
>
```
http://127.0.0.1/api/setRating?offerId=3&userId={id}
```
```
http://127.0.0.1/api/setRating?offerId=3&userId=1
```

##### rating:
>"rating" ist ein benötigtes Argument. Es muss eine Zahl zwischen 1 und 5 sein.
>
```
http://127.0.0.1/api/setRating?offerId=3&userId=1&rating={id}
```
```
http://127.0.0.1/api/setRating?offerId=3&userId=1&rating=3
```
##### comment:
>"comment" ist ein optionales Argument. Es fügt der Bewertung des Gerichtes einen Kommentar in Textform hinzu. 
>
```
http://127.0.0.1/api/setRating?offerId=3&userId=1&rating=3&comment={comment}
```
```
http://127.0.0.1/api/setRating?offerId=3&userId=1&rating=3&comment=Das Essen war supertoll! Kann ich nur weiterempfhlen.
```
### updateRating:
___
#### Beschreibung:
>"updateRating" ist für die Bearbeitung einer Bewertung da. So ist es möglich, den Kommentar, das rating oder beides zu aktuallisieren.
>
#### Args:
##### offerId:
>"offerId" ist ein benötigtes Argument. Es dient der Zuordnung zu einem Gericht.
>
```
http://127.0.0.1/api/setRating?offerId={id}
```
```
http://127.0.0.1/api/setRating?offerId=3
```
##### userId:
>"offerId" ist ein benötigtes Argument. Es dient der Identifikation eines Nutzers.
>
```
http://127.0.0.1/api/setRating?offerId=3&userId={id}
```
```
http://127.0.0.1/api/setRating?offerId=3&userId=1
```

##### rating:
>"rating" ist ein optionales Argument. Es muss eine Zahl zwischen 1 und 5 sein. Dabei wird dann der Wert der Bewertung aktualisiert.
>
```
http://127.0.0.1/api/setRating?offerId=3&userId=1&rating={id}
```
```
http://127.0.0.1/api/setRating?offerId=3&userId=1&rating=3
```
##### comment:
>"comment" ist ein optionales Argument. Es aktualiesiert den Kommentar der Bewertung.
>
```
http://127.0.0.1/api/setRating?offerId=3&userId=1&comment={comment}
```
```
http://127.0.0.1/api/setRating?offerId=3&userId=1&comment=Das Essen war supertoll!
```
### delRating:
___
#### Beschreibung:
>Löscht eine Bewertung.
>
#### Args:
##### offerId:
>"offerId" ist ein benötigtes Argument. Es dient der Zuordnung zu einem Gericht.
>
```
http://127.0.0.1/api/setRating?offerId={id}
```
```
http://127.0.0.1/api/setRating?offerId=3
```
##### userId:
>"offerId" ist ein benötigtes Argument. Es dient der Identifikation eines Nutzers.
>
```
http://127.0.0.1/api/setRating?offerId=3&userId={id}
```
```
http://127.0.0.1/api/setRating?offerId=3&userId=1
```
=======
# Lunchbox

## Framework7 CLI Options

Framework7 app created with following options:

```
{
  "cwd": "C:\\Users\\Florian\\Documents\\fr7",
  "type": [
    "cordova"
  ],
  "name": "Lunchbox",
  "pkg": "de.lunchbox",
  "framework": "core",
  "template": "single-view",
  "bundler": "vite",
  "cssPreProcessor": "stylus",
  "cordova": {
    "folder": "cordova",
    "platforms": [
      "ios",
      "android"
    ],
    "plugins": [
      "cordova-plugin-statusbar",
      "cordova-plugin-keyboard",
      "cordova-plugin-splashscreen"
    ]
  },
  "theming": {
    "customColor": true,
    "color": "#007755",
    "darkTheme": false,
    "iconFonts": true,
    "fillBars": false
  },
  "customBuild": false
}
```

## Install Dependencies

First of all we need to install dependencies, run in terminal
```
npm install
```

## NPM Scripts

* 🔥 `start` - run development server
* 🔧 `dev` - run development server
* 🔧 `build` - build web app for production
* 📱 `build-cordova` - build cordova app
* 📱 `build-cordova-ios` - build cordova iOS app
* 📱 `cordova-ios` - run dev build cordova iOS app
* 📱 `build-cordova-android` - build cordova Android app
* 📱 `cordova-android` - run dev build cordova Android app

## Vite

There is a [Vite](https://vitejs.dev) bundler setup. It compiles and bundles all "front-end" resources. You should work only with files located in `/src` folder. Vite config located in `vite.config.js`.
## Cordova

Cordova project located in `cordova` folder. You shouldn't modify content of `cordova/www` folder. Its content will be correctly generated when you call `npm run cordova-build-prod`.





## Assets

Assets (icons, splash screens) source images located in `assets-src` folder. To generate your own icons and splash screen images, you will need to replace all assets in this directory with your own images (pay attention to image size and format), and run the following command in the project directory:

```
framework7 assets
```

Or launch UI where you will be able to change icons and splash screens:

```
framework7 assets --ui
```



## Documentation & Resources

* [Framework7 Core Documentation](https://framework7.io/docs/)



* [Framework7 Icons Reference](https://framework7.io/icons/)
* [Community Forum](https://forum.framework7.io)

## Support Framework7

>>>>>>> 905cf766ccb41ed937e798a194ac765990d015f4
