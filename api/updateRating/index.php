<?php
#Headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");

#?ToDo check what mean
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Credentials: true");

# using fooddb class
include "../intern/database.php";

$db = new FoodBD("localhost","root","");#need to be changed (secrets)

if(!isset($_GET['offerId']) || !isset($_GET['userId']) || ( !isset($_GET['rating']) && !isset($_GET['comment']))){#checking if offerId,userId and (rating or comment) is set
    #error
    echo "not all needed args (\"offerId\",\"userId\", \"rating\" or \"comment\") set";
    http_response_code(404);
    die();
}else{ 
    $db->connect("lunchboxfooddb");#connect to db
    if(isset($_GET['rating']) && !isset($_GET['comment'])){#checks if rating is set and comment is not 
        $db->editRating($_GET['offerId'],$_GET['userId'],$_GET['rating']); # updates only the rating 
    }else if(isset($_GET['comment']) && !isset($_GET['rating'])){#checks if comment is set and rating is not
        $db->editRating($_GET['offerId'],$_GET['userId'],null,$_GET['comment']);#updates only comment
    }else{
        $db->editRating($_GET['offerId'],$_GET['userId'],$_GET['rating'],$_GET['comment']);#updates comment and rating
    }
    $db->disconnect();#disconnect db
    
    #respond
    http_response_code(200);
    echo json_encode(true);
}

?>