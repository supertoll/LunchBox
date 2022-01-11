<?php
#Headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: Post");

#?ToDo check what mean
header("Access-Control-Allow-Headers: *");

# using fooddb class
include "../intern/database.php";

$db = new FoodBD("localhost","lunchboxuser","");#need to be changed (secrets)

if(!isset($_GET['rating']) || !isset($_GET['offerId']) || !isset($_GET['userId'])){#checks if rating, offerId, userId is set
    #error
    echo "not all needed args (\"rating\",\"offerId\",\"userId\") set";
    http_response_code(404);
    die();
}else{ 
    $db->connect("lunchboxfooddb");#connect to db
    if(isset($_GET['comment'])){#checks if comment is also supplyed
        $db->setRating($_GET['rating'],$_GET['offerId'],$_GET['userId'],$_GET['comment']);#create rating with comment
    }else {
        $db->setRating($_GET['rating'],$_GET['offerId'],$_GET['userId']);#create rating without comment
    }
    $db->disconnect();#disconnect db

    #respond
    http_response_code(200);
    echo json_encode(true);
}
#http://127.0.0.1/api/setRating/?rating=3&offerId=950&userId=1
?>