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
$db->connect("lunchboxfooddb");

if(isset($_GET["locations"])){
    $provider = $db->getProvider(json_decode($_GET["locations"]));   
}else{
    $provider = $db->getProvider();
}
$db->disconnect();#disconnect db
#respond
http_response_code(200);
echo json_encode($provider);
?>