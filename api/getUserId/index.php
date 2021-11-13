<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

#?
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Credentials: true");

include "../intern/database.php";

$db = new FoodBD("localhost","root","");#need to be changed (secrets)

$db->connect("lunchboxfooddb");
$id = $db->getUserId();
#echo var_dump($id);
$db->disconnect();

#respond
http_response_code(200);
echo json_encode(array("id"=>$id));

?>