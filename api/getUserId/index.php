<?php
#Headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

#? ToDo check what mean
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Credentials: true");

# using fooddb class
include "../intern/database.php";

$db = new FoodBD("localhost","root","");#need to be changed (secrets)

$db->connect("lunchboxfooddb");#connect to db
$id = $db->getUserId();#getting a userid
#echo var_dump($id);
$db->disconnect();#disconnect db

#respond
http_response_code(200);
echo json_encode(array("id"=>$id));

?>