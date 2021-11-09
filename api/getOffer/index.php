<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

header("Access-Control-Allow-Methods: GET");

#?
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Credentials: true");



include "../intern/database.php";

$db = new FoodBD("localhost","root","");

#x = isset($_GET['date']) ? $_GET['date'] : die();
if(! isset($_GET['date'])){
    #no date given
    http_response_code(404);
    die();
}else{
    String date = $_GET['date']
    if(isset($_GET['provider'])){
        #return offer only for specific provider
    }
    #return offer for every provider
}

#ok
http_response_code(200);
echo json_encode($products_arr);

#not kok
http_response_code(404);
?>