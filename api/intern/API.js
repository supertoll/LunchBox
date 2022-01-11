
    /**
     * Adds a simple way to interface with the modifed lunchbox api. The individual API calls are translated in methods of this class.
     * @param baseUrl - Sting of the base url of the api. EG. "lunchboxdev.ddns.net"
     */
class FoodApi{
    constructor(baseUrl = "127.0.0.1/api/"){
        if(baseUrl.slice(-1) != "/"){//checking for a "/" at the end 
            baseUrl += "/";
        }
        this.baseUrl = baseUrl;
    }


    /**
         * makes the actual api call.
         * @param endPoint - Is the endPoint wich is called. EG. "getLocations"
         * @param param - (optional) Is a dic of the values wich are handed overe. The keys of the dic need to mach the real api parameter name.
         * @param method - (optional) Specifies the http method. (GET, DELETE, POST ..etc)
         * @returns {JSON} - returns the json respons of the api call
    */
    #callAPI(endPoint,param= null,method="GET"){
        //creating a param string
        let paramString = "?";
        if(param != null){
            for (let key of Object.keys(param)) {
                //console.log(key);
                //console.log(param[key]);
                if (Array.isArray(param[key])){//converts array to json
                    param[key] = JSON.stringify(param[key]);
                    //console.log(param[key]);
                }
                paramString += `${key}=${param[key]}&`;
            }
        }
        
        let url = this.baseUrl+ endPoint+"/index.php"+paramString;//assamble the api url
        //console.log(url);

        //making the call
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open( method, url, false ); // false for synchronous request
        xmlHttp.send(  );
        return JSON.parse(xmlHttp.responseText);   
    }
    
    /**
     * returns a userid.
     */
    getUserId(){
        return this.#callAPI("getUserId");
    }

    /**
     * returns a list of available locations
     */
    getLocations(){
        return this.#callAPI("getLocations");
    }

    /**
     * returns available provider. Its possible to specifie the location of wich providers are returned.
     * @param locations - (optional) nerrows down the provider. Is in form of a list of the location name. EG. ["Neubrandenburg"]
     */
    getProvider(locations=null){
        if(locations == null){//check if defined
            return this.#callAPI("getProvider");
        }else{
            return this.#callAPI("getProvider",{"locations":locations});
        }
    }

    /**
     * retuns the offers. Can be nerrowed down to locations/ provider
     * @param date - in format "yyyy-mm-dd"
     * @param locations - (optional) nerrows down the offers to a spesific location. Is in form of a list of the location name. EG. ["Neubrandenburg"]
     * @param provider - (optional) nerrows down the offers to specific providers. Is in form, of a list of the provider ids. EG. [1,2,3,4]
     */
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

    /**
     * sets a rating for a offer
     * @param offerId - is the id of a offer, is used to connect a rating to a offer.
     * @param userId - is the id of a user, is used to connect a rating to a user.
     * @param rating - is the rating in 1-5 stars.
     * @param comment - (optional) is a comment for a offer rating.
     */
    setRating(offerId,userId,rating,comment=null){
        if (comment == null){
            this.#callAPI("setRating",{"offerId":offerId,"userId":userId,"rating":rating});
        }else{            
            this.#callAPI("setRating",{"offerId":offerId,"userId":userId,"rating":rating,"comment":comment});
        }
    }

    /**
     * updates alredy done ratings
     * @param offerId - is the id of a offer, is used to connect a rating to a offer.
     * @param userId - is the id of a user, is used to connect a rating to a user.
     * @param rating - (optional) the to update rating
     * @param comment - (optional) the to update comment
     */
    updateRating(offerId,userId,rating=null,comment=null){
        if(rating != null && comment == null){
            this.#callAPI("updateRating",{"offerId":offerId,"userId":userId,"rating":rating},"POST")
        }else if(rating == null && comment != null){
            this.#callAPI("updateRating",{"offerId":offerId,"userId":userId,"comment":comment},"POST")
        }else{
            this.#callAPI("updateRating",{"offerId":offerId,"userId":userId,"rating":rating,"comment":comment},"POST")
        }
    }

    /**
     * del a rating
     * @param offerId - is the id of a offer, is used to connect a rating to a offer.
     * @param userId - is the id of a user, is used to connect a rating to a user.
     */
    delRating(offerId,userId){
        this.#callAPI("delRating",{"offerId":offerId,"userId":userId},"DELETE")
    }
}


/*testing
let api = new FoodApi("http://192.168.2.202/");
console.log(api.getUserId());
console.log(api.getLocations());
console.log(api.getProvider(["Neubrandenburg"]));
console.log(api.getOffer("2022-1-06",["Neubrandenburg"],[4]));
console.log(api.setRating(180,1,4,"hi ich bin toll"));
console.log(api.updateRating(180,1,5,"hi du bist toll"));
console.log(api.delRating(180,1));
*/
