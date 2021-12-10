<?php
#Headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");

#? ToDo check what mean
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Credentials: true");

# using fooddb class
include "../intern/database.php";

$db = new FoodBD("localhost","lunchboxuser","");#need to be changed (secrets)


if(!isset($_GET['offerId']) || !isset($_GET['userId'])){#testing if offerId and userid is set (needed)
    #error
    echo "not all needed args (\"offerId\",\"userId\") set";
    http_response_code(404);
    die();
}else{ 
    $db->connect("lunchboxfooddb");#connect to db
    $db->delRating($_GET['offerId'],$_GET['userId']);#del the rating
    $db->disconnect();#disconnect db
    
    #respond
    http_response_code(200);
    echo json_encode(true);
}

?>