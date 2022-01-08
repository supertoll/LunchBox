//require("XMLHttpRequest");
var j = "";

class FoodApi{
    constructor(baseUrl = "127.0.0.1/api/"){
        if(baseUrl.slice(-1) != "/"){
            baseUrl += "/";
        }

        this.baseUrl = baseUrl;
    }

    async #callAPI(endPoint,param= null,method="GET"){
        let paramString = "";
        if(param != null){
            paramString += "?"
            for (key in param.keys()){
                if (typeof param[key] == "array"){
                    param[key] = JSON.stringify(param[key]);
                }
                paramString += key + "=" + param[key]+"&";
            }
        }
        let url = this.baseUrl+ endPoint+"/index.php"+paramString;

        return new Promise(function (resolve, reject) {
            resolve(fetch(url).json)
          })

        
    }

    getUserId(){
        return this.#callAPI("getUserId");
    }

    getLocations(){
        let response = this.#callAPI("getLocations");
        
        console.log(response);
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
            return this.#callAPI("getOffer");
        }else if(locations != null && provider == null){
            return this.#callAPI("getOffer",{"locations":locations});
        }else if(locations == null && provider != null){
            return this.#callAPI("getOffer",{"provider":provider});
        }else if(locations != null && provider == null){
            return this.#callAPI("getOffer",{"locations":locations,"provider":provider});
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
let api = new FoodApi("http://127.0.0.1/api");

console.log(api.getLocations());