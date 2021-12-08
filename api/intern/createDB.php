<?php

include "./database.php";

$db = new FoodBD("localhost","lunchboxuser","");
$db->connect();
$db->executeSQLFromFile("./../DB/createLunchBoxFoodDB.sql");
$db->dropDB();
$db->executeSQLFromFile("./../DB/createLunchBoxFoodDB.sql");
$db->disconnect();
$db->connect("lunchboxfooddb");
fillfoodDB($db);
#echo var_dump($db->foo(130));
$db->disconnect();
?>