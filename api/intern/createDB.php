<?php

include "./database.php";

$db = new FoodBD("localhost","root","");
$db->connect();
$db->dropDB();
$db->executeSQLFromFile("./../DB/createLunchBoxFoodDB.sql");
$db->disconnect();
$db->connect("lunchboxfooddb");
fillfoodDB($db);
#echo var_dump($db->foo(130));
$db->disconnect();
?>