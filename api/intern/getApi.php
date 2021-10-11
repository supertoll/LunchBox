<?php
#gets the jsondata from the website, according to the endpoint
function GETAPI($url){
    $url = "https://lunchbox.rori.info/api/v2/$url";#base url + endpoint
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($curl);#makes the curl call --> gets jsonstring
    curl_close($curl);

    return json_decode($result);# returns the jsonstring as json
}

#calls the api endpoint "lunchProvider"
function getProvider(){    
    return GETAPI("lunchProvider");
}

#calls the api endpoint "lunchOffer"
function getOffer(){    
    return GETAPI("lunchOffer");
}


?>