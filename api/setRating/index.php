<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: Post");

#?
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Credentials: true");

include "../intern/database.php";

$db = new FoodBD("localhost","root","");#need to be changed (secrets)

if(!isset($_GET['rating']) || !isset($_GET['offerId']) || !isset($_GET['userId'])){
    echo "not all args (\"rating\",\"offerId\",\"userId\") set";
    http_response_code(404);
    die();
}else{ 
    $db->connect("lunchboxfooddb");
    if(isset($_GET['comment'])){
        $db->setRating($_GET['rating'],$_GET['offerId'],$_GET['userId'],$_GET['comment']);
    }else {
        $db->setRating($_GET['rating'],$_GET['offerId'],$_GET['userId']);
    }
    $db->disconnect();

    #respond
    http_response_code(200);
    echo json_encode(true);
}

?>