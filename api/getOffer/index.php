<?php
#Headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

#?ToDo check what mean
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Credentials: true");


# using fooddb class
include "../intern/database.php";

$db = new FoodBD("localhost","lunchboxuser","");#need to be changed (secrets)

if(!isset($_GET['date'])){#checking if date is set.. (needed)
    #error
    echo "not all needed args (\"date\") set";
    http_response_code(404);
    die();
}else{ 
    #echo var_dump($_GET['date']);
    $db->connect("lunchboxfooddb");#connect to db
    if(isset($_GET['provider'])){#checks if a array of provider is givin
        #echo var_dump(json_decode($_GET['provider']));
        if(isset($_GET["location"])){
            $offer = $db->getOffer($_GET['date'],json_decode($_GET['provider']),json_decode($_GET["location"]));
        }else{
            $offer = $db->getOffer($_GET['date'],json_decode($_GET['provider'])); # returns only offers for givin providers
        }
    }else {#only date given
        if(isset($_GET["location"])){
            $offer = $db->getOffer($_GET['date'],null,json_decode($_GET["location"]));
        }else {
            $offer = $db->getOffer($_GET['date']); # returns all offers at this day
        }
    }
    $db->disconnect();#disconnect db

    #respond
    http_response_code(200);
    echo json_encode($offer);
}

?>