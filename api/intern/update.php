<?php
include "./database.php";

$db = new FoodBD("localhost","lunchboxuser","");
$db->connect("lunchboxfooddb");
// current day date("Y-m-d");
$db->delOldOffer(date("Y-m-d",strtotime("-14 day")));

$db->disconnect();
?>