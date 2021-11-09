<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Methods: GET");

#?
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Credentials: true");



include "../intern/database.php";

isset($_GET['id']) ? $_GET['id'] : die();

$db = new FoodBD("localhost","root","");
#ok
http_response_code(200);
echo json_encode($products_arr);

#not kok
http_response_code(404);
?>