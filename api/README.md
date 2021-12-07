# Schnittstellenberschreibung
____
## Beschreibung:
>Diese API basiert auf Daten der [rori-api](https://lunchbox.rori.info/about). Sie liefert die Essensangebote von Partnern. Die API fügt der rori-api noch weitere Funtion hinzu. So gibt es zusätzlich die Möglichkeit der Bewertung und Kommentierung. Außerdem ist es möglich einzelne Essensangebote für bestimmte Orte, Tage, Essensanbieter zu bekommen.
>
## Funktionen:
### getOffer
___
#### Beschreibung:
>Die getOffer Methode ist eine GET Methode. Sie gibt im Allgemeinen Essensangebote für ein bestimmtes Datum wieder. Jedoch können auch nur Essensangebote für bestimmte Essensanbieter und/oder ein bestimmten Ort geliefert werden.
>
#### Args:
##### date:
>"date" ist ein nötiges Argument das in jedem Fall übergeben werden muss. Das Format entspricht **{jjjj}-{mm}-{dd}**. Durch "date" werden nur Essensangebote für das entsprechende Datum zurückgegeben.
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
},
{
"id": 738,
"providerId": 4,
"name": "Karotten-Kürbis-Creme",
"description": "Butternut Kürbis, Hokkaido Kürbis, Karotten, Sahne, Kürbiskernöl, etwas Muskat",
"price": 520,
"averageRating": null,
"tags": [
"vegetarisch"
],
"comments": []
},
{
"id": 743,
"providerId": 4,
"name": "klarer Wintereintopf",
"description": "mit Steckrüben, Kartoffeln, Brokkoli, Rosenkohl, Pariser Möhren, Grünkohl",
"price": 520,
"averageRating": null,
"tags": [
"vegan"
],
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
},
{
"id": 779,
"providerId": 7,
"name": "Boulette Mischgemüse",
"description": "Kartoffeln",
"price": 600,
"averageRating": null,
"tags": [],
"comments": []
},
{
"id": 780,
"providerId": 7,
"name": "Kartoffelsuppe",
"description": "mit Bockwurst",
"price": 450,
"averageRating": null,
"tags": [],
"comments": []
}
]
```
##### location:
>"location" ist ein optionales Argument. Durch Location werden nur nach der entsprechenden "location" gefilterte Essensangebote zurückgegeben.
>
```
http://127.0.0.1/api/getOffer/?date=2021-12-7&location={location}
```
```
http://127.0.0.1/api/getOffer/?date=2021-12-7&location=Neubrandenburg
```
output:
```JSON
[
{
"id": 773,
"providerId": 1,
"name": "Kasselersteak",
"description": "mit Sauerkraut und Kartoffelpüree",
"price": 590,
"averageRating": null,
"tags": [],
"comments": []
},
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
},
{
"id": 738,
"providerId": 4,
"name": "Karotten-Kürbis-Creme",
"description": "Butternut Kürbis, Hokkaido Kürbis, Karotten, Sahne, Kürbiskernöl, etwas Muskat",
"price": 520,
"averageRating": null,
"tags": [
"vegetarisch"
],
"comments": []
},
{
"id": 743,
"providerId": 4,
"name": "klarer Wintereintopf",
"description": "mit Steckrüben, Kartoffeln, Brokkoli, Rosenkohl, Pariser Möhren, Grünkohl",
"price": 520,
"averageRating": null,
"tags": [
"vegan"
],
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
}
]
```
##### provider:

>"provider" ist ein optionales Argument. Es erhält ein Array mit Essensanbieter id's in json Format **[n\*{0-9}]**. Mit "location" werden nur Essensangebote von den entsprechenden Essensanbiertern angezeigt.
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
### getUserId:
___
#### Beschreibung:
>"getUserId" gibt eine userid zurück und ist eine GET Methode. Sie wird zum kommentieren benötigt. Die Funktion benötigt keine weiteren Parameter.
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
### setRating:
___
#### Beschreibung:
>Fügt einem Gericht eine Bewertung (1-5) hinzu. Außerdem ist es möglich ein Kommentar zu hinterlegen:
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
>"offerId" ist ein benötigtes Argument. Es Dient der Identifikation eines Nutzers.
>
```
http://127.0.0.1/api/setRating?offerId=3&userId={id}
```
```
http://127.0.0.1/api/setRating?offerId=3&userId=1
```

##### rating:
>"rating" ist ein immer benötigtes Argument. Es muss eine zahl zwischen 1 und 5 sein.
>
```
http://127.0.0.1/api/setRating?offerId=3&userId=1&rating={id}
```
```
http://127.0.0.1/api/setRating?offerId=3&userId=1&rating=3
```
##### comment:
>"comment" ist ein optionales Argument. Es Fügt der Bewertung des Gerichtes ein Kommentar in Textform hinzu. 
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
>"updateRating" ist für die Bearbeitung einer Bewertung da. So ist es möglich den Kommentar, das rating oder beides zu aktuallisieren.
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
>"rating" ist ein optionales Argument. Es muss eine zahl zwischen 1 und 5 sein. Dabei wird dann der Wert der Bewertung aktuallisiert.
>
```
http://127.0.0.1/api/setRating?offerId=3&userId=1&rating={id}
```
```
http://127.0.0.1/api/setRating?offerId=3&userId=1&rating=3
```
##### comment:
>"comment" ist ein optionales Argument. Es aktualliesiert den  Kommentar der Bewertung.
>
```
http://127.0.0.1/api/setRating?offerId=3&userId=1&comment={comment}
```
```
http://127.0.0.1/api/setRating?offerId=3&userId=1&comment=Das Essen war supertoll!
```
### delRating:
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
### getProvider:
#### Beschreibung:
>Gibt die Essensanbieter und ihre daten zurück.
>
```
http://127.0.0.1/api/getProvider
```
output:
```Json
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
"id": 5,
"name": "Salt 'n' Pepper",
"location": "Berlin Springpfuhl",
"url": "https://www.partyservice-rohde.de/bistro-angebot-der-woche"
},
{
"id": 6,
"name": "Gesundheitszentrum",
"location": "Berlin Springpfuhl",
"url": "https://de-de.facebook.com/pages/Kantine-BQuakatz-Allee-der-Kosmonauten/181190361991823"
},
{
"id": 7,
"name": "Feldküche Karow",
"location": "Berlin Springpfuhl",
"url": "https://www.feldkuechebkarow.de/speiseplan"
},
{
"id": 8,
"name": "Das Krauthof",
"location": "Neubrandenburg",
"url": "https://www.daskrauthof.de/karte"
},
{
"id": 9,
"name": "Tabbouleh",
"location": "Berlin Springpfuhl",
"url": "https://www.restaurant-tabbouleh.de/menu"
},
{
"id": 10,
"name": "Phoenixeum",
"location": "Neubrandenburg",
"url": "https://www.suppenkult.com/wochenplan.html"
}
]
```