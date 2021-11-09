<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

header("Access-Control-Allow-Methods: GET");

#?
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Credentials: true");



include "../intern/database.php";

$db = new FoodBD("localhost","root","");#need to be changed (secrets)

if(!isset($_GET['date'])){
    http_response_code(404);
    die();
}else{
    #echo var_dump($_GET['date']);
    $db->connect("lunchboxfooddb");
    if(isset($_GET['provider'])){#not jet working
        echo var_dump($_GET['provider']);
        $offer = $db->getAllOfferByDateAndProvider($_GET['date'],$_GET['provider']);
    }else {#only date given
        $offer = $db->getAllOfferByDate($_GET['date']);
    }
    $db->disconnect();

    #respond
    http_response_code(200);
    echo json_encode($offer);
}

?>