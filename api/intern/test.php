<?php

include "./database.php";

$db = new FoodBD("localhost","root","");
$db->connect("lunchboxfooddb");

echo var_dump($db->getProvider());

$db->disconnect();
?>