<?php
include "./database.php";

$db = new FoodBD("localhost","lunchboxuser","");
$db->connect("lunchboxfooddb");


$db->disconnect();
?>