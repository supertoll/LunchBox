<?php
include "./database.php";

$db = new FoodBD("localhost","lunchboxuser","");
$db->connect("lunchboxfooddb");
$db->delOldOffer("2022-05-31");

$db->disconnect();
?>