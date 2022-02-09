<?php
#Headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

#?ToDo check what mean
header("Access-Control-Allow-Headers: *");


# using fooddb class
include "../intern/database.php";

$db = new FoodBD("localhost","lunchboxuser","");#need to be changed (secrets)

if(!isset($_GET['id'])){#checking if date is set.. (needed)
    #error
    echo "not all needed args (\"id\") set";
    http_response_code(404);
    die();
}else{ 
    #echo var_dump($_GET['date']);
    $db->connect("lunchboxfooddb");#connect to db
    $offer = $db->getOfferById($_GET['id']);
    $db->disconnect();#disconnect db

    #respond
    http_response_code(200);
    echo json_encode($offer);
}

?>