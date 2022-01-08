
class FoodApi{
    constructor(baseUrl = "127.0.0.1/api/"){
        if(baseUrl.slice(-1) != "/"){
            baseUrl += "/";
        }

        this.baseUrl = baseUrl;
    }

    #callAPI(endPoint,param= null,method="GET"){
        let paramString = "?";
        if(param != null){
            for (let key of Object.keys(param)) {
                //console.log(key);
                //console.log(param[key]);
                if (Array.isArray(param[key])){
                    param[key] = JSON.stringify(param[key]);
                    //console.log(param[key]);
                }
                paramString += `${key}=${param[key]}&`;
            }
        }
        
        let url = this.baseUrl+ endPoint+"/index.php"+paramString;
        console.log(url);

        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open( method, url, false ); // false for synchronous request
        xmlHttp.send( null );
        return JSON.parse(xmlHttp.responseText);

        
    }

    getUserId(){
        return this.#callAPI("getUserId");
    }

    getLocations(){
        let response = this.#callAPI("getLocations");
        
        return response;
    }

    getProvider(locations=null){
        if(locations == null){//check if defined
            return this.#callAPI();
        }else{
            return this.#callAPI("getProvider",{"locations":locations});
        }
    }

    getOffer(date,locations=null,provider=null){
        if(locations == null && provider == null){
            return this.#callAPI("getOffer",{"date":date});
        }else if(locations != null && provider == null){
            return this.#callAPI("getOffer",{"date":date,"locations":locations});
        }else if(locations == null && provider != null){
            return this.#callAPI("getOffer",{"date":date,"provider":provider});
        }else if(locations != null && provider != null){
            return this.#callAPI("getOffer",{"date":date,"locations":locations,"provider":provider});
        }
    }

    setRating(offerId,userId,rating,comment=null){
        if (comment == null){
            this.#callAPI("setRating",{"offerId":offerId,"userId":userId,"rating":rating});
        }else{            
            this.#callAPI("setRating",{"offerId":offerId,"userId":userId,"rating":rating,"comment":comment});
        }
    }

    updateRating(offerId,userId,rating=null,comment=null){
        if(rating != null && comment == null){
            this.#callAPI("updateRating",{"offerId":offerId,"userId":userId,"rating":rating},"UPDATE")
        }else if(rating == null && comment != null){
            this.#callAPI("updateRating",{"offerId":offerId,"userId":userId,"comment":comment},"UPDATE")
        }else{
            this.#callAPI("updateRating",{"offerId":offerId,"userId":userId,"rating":rating,"comment":comment},"UPDATE")
        }
    }

    delRating(offerId,userId){
        this.#callAPI("delRating",{"offerId":offerId,"userId":userId},"DELETE")
    }
}
    
//let api = new FoodApi("http://lunchboxdev.ddns.net/");

/*
let api = new FoodApi("http://192.168.2.202/");

console.log(api.getUserId());
console.log(api.getLocations());
console.log(api.getProvider(["Neubrandenburg"]));
console.log(api.getOffer("2022-1-06",["Neubrandenburg"],[4]));
*/
