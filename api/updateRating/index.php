<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");

#?
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Credentials: true");

include "../intern/database.php";

$db = new FoodBD("localhost","root","");#need to be changed (secrets)

if(!isset($_GET['offerId']) || !isset($_GET['userId']) || ( !isset($_GET['rating']) && !isset($_GET['comment']))){
    echo "not all args (\"offerId\",\"userId\", \"rating\" or \"comment\") set";
    http_response_code(404);
    die();
}else{ 
    $db->connect("lunchboxfooddb");
    if(isset($_GET['rating']) && !isset($_GET['comment'])){
        $db->editRating($_GET['offerId'],$_GET['userId'],$_GET['rating']);
    }else if(isset($_GET['comment']) && !isset($_GET['rating'])){
        $db->editRating($_GET['offerId'],$_GET['userId'],null,$_GET['comment']);
    }else{
        $db->editRating($_GET['offerId'],$_GET['userId'],$_GET['rating'],$_GET['comment']);
    }
    $db->disconnect();
    #respond
    http_response_code(200);
    echo json_encode(true);
}

?>