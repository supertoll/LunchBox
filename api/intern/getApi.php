<?php
function GETAPI($url){
    $url = "https://lunchbox.rori.info/api/v2/$url";
    echo $url;
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($curl);
    curl_close($curl);
    return json_decode($result);
}
function getProvider(){    
    return GETAPI("lunchProvider");
}

function getOffer(){    
    return GETAPI("lunchOffer");
}


?>