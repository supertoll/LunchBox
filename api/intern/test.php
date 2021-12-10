<?php

include "./database.php";

$db = new FoodBD("localhost","lunchboxuser","");
$db->connect("lunchboxfooddb");
echo json_encode($db->getProvider(["Neubrandenburg"]));

$db->disconnect();
?>